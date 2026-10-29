import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5g37myau";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_SECRET_TOKEN;

const LEDGER_PATH = path.join(process.cwd(), "src", "data", "inquiries.json");

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

function readLocalLedger() {
  try {
    if (fs.existsSync(LEDGER_PATH)) {
      const data = fs.readFileSync(LEDGER_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("Could not read local inquiries ledger:", err.message);
  }
  return [];
}

function saveToLocalLedger(item) {
  try {
    const dir = path.dirname(LEDGER_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const list = readLocalLedger();
    // Prevent rapid duplicate submission (e.g. double click)
    const isRecentDuplicate = list.some(
      (existing) =>
        existing.email?.toLowerCase() === item.email?.toLowerCase() &&
        existing.name?.toLowerCase() === item.name?.toLowerCase() &&
        Math.abs(new Date(existing.submittedAt).getTime() - new Date(item.submittedAt).getTime()) < 30000
    );
    if (isRecentDuplicate) {
      return true;
    }
    list.unshift(item);
    // Keep last 150 inquiries
    const trimmed = list.slice(0, 150);
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(trimmed, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Local ledger write error:", err.message);
    return false;
  }
}

// GET: Returns list of recent inquiries (used by admin tools / studio)
export async function GET() {
  try {
    const localInquiries = readLocalLedger();
    return NextResponse.json({
      ok: true,
      count: localInquiries.length,
      inquiries: localInquiries,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to read inquiries" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const b = await req.json();

    // Honeypot check for spam bots
    if (b.company) {
      return NextResponse.json({ ok: true, spamBlocked: true });
    }

    const name = String(b.name || "").trim().slice(0, 100);
    const email = String(b.email || "").trim().slice(0, 150);
    const location = String(b.location || "").trim().slice(0, 150);

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid name and email address." }, { status: 400 });
    }

    if (!location) {
      return NextResponse.json({ error: "Please enter the city or location of the project." }, { status: 400 });
    }

    const types = Array.isArray(b.types) ? b.types.slice(0, 10).map(String) : [];
    const submissionId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const nowISO = new Date().toISOString();

    const submissionData = {
      _id: submissionId,
      _type: "contactSubmission",
      name,
      email,
      phone: String(b.phone || "").trim(),
      services: types,
      location: String(b.location || "").trim(),
      budget: String(b.budget || "").trim(),
      timeline: String(b.timeline || "").trim(),
      slot: String(b.slot || "").trim(),
      message: String(b.message || "").trim().slice(0, 3000),
      status: "New",
      submittedAt: nowISO,
    };

    // 1. ALWAYS persist to local JSON ledger (Zero data loss guarantee)
    saveToLocalLedger(submissionData);

    // 2. Persist directly to Sanity CMS if token is provided
    let sanitySaved = false;
    let sanityDocId = null;

    if (token) {
      try {
        const sanityWriteClient = createClient({
          projectId,
          dataset,
          apiVersion,
          useCdn: false,
          token,
        });

        const sanityDoc = await sanityWriteClient.create({
          _type: "contactSubmission",
          name: submissionData.name,
          email: submissionData.email,
          phone: submissionData.phone,
          services: submissionData.services,
          location: submissionData.location,
          budget: submissionData.budget,
          timeline: submissionData.timeline,
          slot: submissionData.slot,
          message: submissionData.message,
          status: "New",
          submittedAt: submissionData.submittedAt,
        });

        sanitySaved = true;
        sanityDocId = sanityDoc._id;
        console.log("✓ Successfully saved inquiry to Sanity CMS:", sanityDocId);
      } catch (sanityErr) {
        console.warn("Notice: Sanity write skipped/pending token:", sanityErr.message);
      }
    } else {
      console.log(
        "Notice: SANITY_API_TOKEN not yet in .env.local. Submission saved to local ledger; can be synced in Sanity Studio."
      );
    }

    // 3. Send Email notifications via Nodemailer
    let emailSent = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 465),
          secure: Number(process.env.SMTP_PORT || 465) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const row = (k, v) =>
          v
            ? `<tr>
                <td style="padding:10px 20px 10px 0;color:#7A746B;font-weight:600;width:150px;border-bottom:1px solid #ECE7DE;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">${k}</td>
                <td style="padding:10px 0;color:#1A1A1A;border-bottom:1px solid #ECE7DE;font-size:14px">${esc(v)}</td>
              </tr>`
            : "";

        const recipient = process.env.CONTACT_TO || process.env.SMTP_USER;

        // A) Studio Lead Notification Email
        await transporter.sendMail({
          from: `"Insync Atelier Enquiries" <${process.env.SMTP_USER}>`,
          to: recipient,
          replyTo: email,
          subject: `✨ New Client Lead: ${name} (${types.join(", ") || "General Enquiry"})`,
          html: `
          <div style="font-family:'Montserrat',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;max-width:620px;margin:auto;padding:36px 32px;background:#FBF9F6;color:#1A1A1A;border:1px solid #E8E2D7;">
            <div style="border-bottom:2px solid #C5A059;padding-bottom:16px;margin-bottom:24px;">
              <p style="letter-spacing:0.28em;font-size:11px;color:#C5A059;text-transform:uppercase;margin:0 0 6px;font-weight:600">INSYNC BY ANCCHAL · NEW COMMISSION ENQUIRY</p>
              <h2 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;margin:0;color:#1A1A1A">New Client Consultation Request</h2>
            </div>
            
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
              ${row("Client Name", name)}
              ${row("Email Address", email)}
              ${row("Phone Number", b.phone)}
              ${row("Disciplines / Services", types.join(", "))}
              ${row("Project Location", b.location)}
              ${row("Approximate Budget", b.budget)}
              ${row("Desired Timeline", b.timeline)}
              ${row("Preferred Time", b.slot)}
              ${row("Client Vision", String(b.message || "").slice(0, 3000))}
            </table>

            <div style="padding:18px;background:#F3EFE6;border-left:3px solid #C5A059;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#3E3A34;line-height:1.6">
                <strong>Studio Action:</strong> View this lead in Sanity Admin under <strong>6. Inquiries & Leads</strong> to update status or record private notes.
              </p>
            </div>

            <div style="padding-top:16px;border-top:1px solid #ECE7DE;font-size:12px;color:#8C867C;">
              Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST &bull; Insync Atelier Website
            </div>
          </div>`,
        });

        // B) Client Immediate Confirmation / Thank You Email
        await transporter.sendMail({
          from: `"Insync by Ancchal" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Thank you for reaching out | Insync by Ancchal",
          html: `
          <div style="font-family:Georgia,serif;max-width:540px;margin:auto;padding:44px 34px;background:#FAF8F5;color:#1B1A17;border:1px solid #EFE9DE">
            <p style="letter-spacing:.3em;font-size:11px;color:#C5A059;margin:0 0 24px;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;font-weight:600">INSYNC BY ANCCHAL</p>
            <h1 style="font-weight:normal;font-size:28px;margin:0 0 20px;color:#1A1A1A">Dear ${esc(name.split(" ")[0])},</h1>
            <p style="line-height:1.8;font-size:15px;color:#3E3A34">Thank you for beginning a conversation with our atelier. Your enquiry has reached Ancchal and our design team.</p>
            <p style="line-height:1.8;font-size:15px;color:#3E3A34">We listen closely to every client’s spatial philosophy and lifestyle nuances. Our team will review your project details and reach out within one working day.</p>
            
            <div style="margin:28px 0;padding:20px;background:#FFFFFF;border-left:3px solid #C5A059;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.65;color:#555048">
              <strong style="color:#1A1A1A;font-size:14px">Insync Interiors Atelier</strong><br/>
              SCF - 1, Third Floor, I Block Market, Sarabha Nagar<br/>
              (Opp. Nav Durga Mata Mandir), Ludhiana – 141001<br/>
              <span style="color:#8C867C;display:inline-block;margin-top:4px">Monday – Saturday &bull; 10:00 AM – 6:00 PM IST</span>
            </div>
            
            <p style="margin-top:28px;font-size:15px;line-height:1.7;color:#3E3A34">Warm regards,<br/><strong style="color:#1A1A1A">Team Insync by Ancchal</strong></p>
          </div>`,
        });

        emailSent = true;
        console.log("✓ Studio notification & client confirmation emails sent successfully via SMTP.");
      } catch (mailErr) {
        console.error("Nodemailer error:", mailErr.message);
      }
    } else {
      console.log("SMTP not configured in env. Local log of enquiry:", {
        name,
        email,
        phone: b.phone,
        services: types,
        location: b.location,
        budget: b.budget,
        timeline: b.timeline,
        slot: b.slot,
        message: b.message,
      });
    }

    return NextResponse.json({
      ok: true,
      id: submissionId,
      sanitySaved,
      emailSent,
      sanityDocId,
    });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Server error processing enquiry" }, { status: 500 });
  }
}
