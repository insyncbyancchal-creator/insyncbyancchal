'use client'

import { useEffect } from 'react'
import { useClient } from 'sanity'

export function StudioAutoSyncNavbar(props) {
  const client = useClient({ apiVersion: '2024-03-01' })

  useEffect(() => {
    let isCancelled = false

    async function autoSync() {
      try {
        const res = await fetch('/api/contact')
        if (!res.ok) return
        const data = await res.json()
        // 1. Fetch current contact submissions from Sanity to check and clean duplicates
        const existingDocs = await client.fetch('*[_type == "contactSubmission"] | order(_createdAt asc) { _id, email, submittedAt, name }')
        const seenKeys = new Set()
        if (Array.isArray(existingDocs)) {
          for (const doc of existingDocs) {
            const key = `${(doc.email || doc.name || '').toLowerCase().trim()}_${doc.submittedAt || ''}`
            if (seenKeys.has(key)) {
              // Duplicate found in Sanity: delete it
              try {
                await client.delete(doc._id)
              } catch {}
            } else {
              seenKeys.add(key)
            }
          }
        }

        // 2. Sync new inquiries from website form without creating duplicates
        if (data.ok && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          for (const inq of data.inquiries) {
            if (isCancelled) break
            const key = `${(inq.email || inq.name || '').toLowerCase().trim()}_${inq.submittedAt || ''}`
            if (!seenKeys.has(key)) {
              await client.createIfNotExists({
                _id: inq._id,
                _type: 'contactSubmission',
                name: inq.name,
                email: inq.email,
                phone: inq.phone || '',
                services: inq.services || [],
                location: inq.location || '',
                budget: inq.budget || '',
                timeline: inq.timeline || '',
                slot: inq.slot || '',
                message: inq.message || '',
                status: inq.status || 'New',
                submittedAt: inq.submittedAt || new Date().toISOString(),
              })
              seenKeys.add(key)
            }
          }
        }

        const testCount = await client.fetch('count(*[_type == "testimonial"])')
        if (testCount === 0 && !isCancelled) {
          const reviews = [
            {
              _id: 'test-1',
              _type: 'testimonial',
              clientName: 'Mansi Poddar',
              roleTitle: 'CONSULTANT & RESIDENCE OWNER',
              location: 'CIVIL LINES, LUDHIANA',
              quote: 'Ancchal and her team are people I trust 100% with any space. She sets the bar so high that when I envision an interior, I cannot think beyond her. Intuitive and deeply attentive, she brings forth the client’s true personality through spatial stillness and soulful materials.',
              rating: 5,
            },
            {
              _id: 'test-2',
              _type: 'testimonial',
              clientName: 'Vikramjit Singh Grewal',
              roleTitle: 'ESTATE OWNER & INDUSTRIALIST',
              location: 'SARABHA NAGAR, LUDHIANA',
              quote: 'Insync by Ancchal brought a quiet, museum-level discipline to our family residence. Ancchal understood from day one that we didn’t seek loud opulence—we wanted timeless stillness, natural travertine, and daylight that changes gracefully through the day.',
              rating: 5,
            },
            {
              _id: 'test-3',
              _type: 'testimonial',
              clientName: 'Dr. Meera & Rajesh Malhotra',
              roleTitle: 'SURGICAL SPECIALISTS & WELLNESS PATRONS',
              location: 'SECTOR 9, CHANDIGARH',
              quote: 'Walking into our residence after demanding days feels like entering a retreat. The acoustic quiet, the hand-waxed joinery, and the seamless connection to the courtyard reflect an understanding of human well-being that goes far beyond conventional decoration.',
              rating: 5,
            },
            {
              _id: 'test-4',
              _type: 'testimonial',
              clientName: 'Harpreet & Amanat Dhillon',
              roleTitle: 'VILLA OWNER & ENTREPRENEUR',
              location: 'MODEL TOWN, JALANDHAR',
              quote: 'Every guest who enters our villa is immediately struck by the restraint. Insync showed us that true luxury is about what you choose not to put into a room. The craftsmanship is flawless, down to the millimeter of every bronze reveal and customized marble island.',
              rating: 5,
            },
            {
              _id: 'test-5',
              _type: 'testimonial',
              clientName: 'Sunaina Ahluwalia',
              roleTitle: 'HERITAGE & ART COLLECTOR',
              location: 'RANJIT AVENUE, AMRITSAR',
              quote: 'As someone who lives surrounded by art, I needed an architect who respected light above all else. Insync conceived our space as a living gallery—calm, tactile, and deeply personal. It is the rare studio that listens with extraordinary patience.',
              rating: 5,
            },
          ]
          for (const r of reviews) {
            await client.createIfNotExists(r)
          }
        }
      } catch (err) {
        console.warn('Sanity auto-sync check:', err.message)
      }
    }

    autoSync()
    const interval = setInterval(autoSync, 20000)
    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [client])

  return props.renderDefault(props)
}
