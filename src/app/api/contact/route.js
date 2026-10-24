import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

// Tiny in-memory rate limit (per server instance). Use Upstash/Redis for real production.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (limited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const b = await req.json();

    // Bot checks: honeypot filled, or form completed impossibly fast
    if (b.company || (typeof b.elapsed === "number" && b.elapsed < 4000)) {
      return NextResponse.json({ ok: true }); // pretend success
    }

    const name = String(b.name || "").trim().slice(0, 100);
    const email = String(b.email || "").trim().slice(0, 150);

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid details" }, { status: 400 });
    }

    const types = Array.isArray(b.types) ? b.types.slice(0, 8).map(String) : [];

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
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
        v ? `<tr><td style="padding:6px 16px 6px 0;color:#888">${k}</td><td>${esc(v)}</td></tr>` : "";

      // 1) Notification to the studio
      await transporter.sendMail({
        from: `"Insync Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `New enquiry: ${name} (${types.join(", ") || "General"})`,
        html: `<table style="font-family:sans-serif;font-size:14px">
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Phone", b.phone)}
          ${row("Services", types.join(", "))}
          ${row("Location", b.location)}
          ${row("Budget", b.budget)}
          ${row("Timeline", b.timeline)}
          ${row("Best time", b.slot)}
          ${row("Message", String(b.message || "").slice(0, 2000))}
        </table>`,
      });

      // 2) Automated response to the visitor (requirement #16)
      await transporter.sendMail({
        from: `"Insync by Ancchal" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank you for reaching out | Insync by Ancchal",
        html: `<div style="font-family:Georgia,serif;max-width:520px;margin:auto;padding:40px 28px;background:#f7f4ee;color:#1b1a17">
          <p style="letter-spacing:.3em;font-size:12px;color:#b99a5b;margin:0 0 24px">INSYNC BY ANCCHAL</p>
          <h1 style="font-weight:300;font-size:30px;margin:0 0 18px">Dear ${esc(name.split(" ")[0])},</h1>
          <p style="line-height:1.7">Thank you for getting in touch. Your enquiry has reached our studio and we will respond personally within one working day.</p>
          <p style="line-height:1.7">Our studio is open Monday to Saturday, 10 AM – 6 PM at INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana 141001.</p>
          <p style="margin-top:32px">Warmly,<br/>Team Insync by Ancchal</p>
        </div>`,
      });
    } else {
      console.log("Mock contact form submission (SMTP not configured in env):", {
        name,
        email,
        phone: b.phone,
        types,
        location: b.location,
        budget: b.budget,
        timeline: b.timeline,
        slot: b.slot,
        message: b.message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
