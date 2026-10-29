'use client'

import React, { useState, useEffect } from 'react'
import { useClient } from 'sanity'
import { projects as defaultProjects } from '../../data/projects'
import { DEFAULT_SERVICES, DEFAULT_PRODUCTS } from '../../lib/services'

export function CatalogSyncTool() {
  const client = useClient({ apiVersion: '2024-03-01' })
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ projects: 0, products: 0, hasServices: false, inquiries: 0, localInquiries: 0 })
  const [statusMsg, setStatusMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const checkStatus = async () => {
    try {
      const [projCount, prodCount, servicesDoc, inqCount] = await Promise.all([
        client.fetch('count(*[_type == "project"])'),
        client.fetch('count(*[_type == "decorProduct"])'),
        client.fetch('*[_type == "servicesPage"][0]._id'),
        client.fetch('count(*[_type == "contactSubmission"])'),
      ])

      let localCount = 0
      try {
        const localRes = await fetch('/api/contact')
        const localData = await localRes.json()
        if (localData.ok) localCount = localData.count || 0
      } catch {}

      setStats({
        projects: projCount || 0,
        products: prodCount || 0,
        hasServices: Boolean(servicesDoc),
        inquiries: inqCount || 0,
        localInquiries: localCount,
      })
    } catch (err) {
      console.warn('Error checking Sanity catalog counts:', err)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  const handleSyncInquiries = async () => {
    setLoading(true)
    setErrorMsg('')
    setStatusMsg('Checking & syncing pending client leads...')
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()

      const existingDocs = await client.fetch('*[_type == "contactSubmission"] | order(_createdAt asc) { _id, email, submittedAt, name }')
      const seenKeys = new Set()
      if (Array.isArray(existingDocs)) {
        for (const doc of existingDocs) {
          const key = `${(doc.email || doc.name || '').toLowerCase().trim()}_${doc.submittedAt || ''}`
          if (seenKeys.has(key)) {
            try { await client.delete(doc._id) } catch {}
          } else {
            seenKeys.add(key)
          }
        }
      }

      if (data.ok && Array.isArray(data.inquiries)) {
        let synced = 0
        for (const inq of data.inquiries) {
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
            synced++
          }
        }
        setStatusMsg(`✓ Done! Leads cleaned and synced (no duplicates). Check '6. Inquiries & Leads'.`)
        setSuccess(true)
        await checkStatus()
      }
    } catch (err) {
      setErrorMsg(`Error syncing inquiries: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSyncAll = async () => {
    setLoading(true)
    setErrorMsg('')
    setStatusMsg('Initializing catalog sync...')
    setSuccess(false)

    try {
      // 1. Initialize Services Page & 5 Disciplines
      setStatusMsg('Setting up Services Page & 5 Disciplines...')
      await client.createOrReplace({
        _id: 'servicesPage',
        _type: 'servicesPage',
        heroEyebrow: 'OUR PRACTICE',
        heroTitle: 'FIVE DISCIPLINES, one quiet STUDIO.',
        heroLede: 'From the first sketch to the final cushion, everything under one roof, and one standard.',
        disciplines: DEFAULT_SERVICES.map((d, i) => ({
          _key: `disc-${i + 1}`,
          no: d.no,
          title: d.title,
          line: d.line,
          tags: d.tags,
          shop: Boolean(d.shop),
        })),
        homeEyebrow: 'INSYNC HOME',
        homeTitle: 'CURATED OBJECTS, made for your SPACE.',
        homeLede: 'Our home collection is crafted to order in our partner ateliers. Each piece is customizable in dimensions, materials and artisan finishes.',
      })

      // 2. Initialize Interior Projects
      setStatusMsg('Importing 19 Interior Projects into Sanity...')
      for (let i = 0; i < defaultProjects.length; i++) {
        const p = defaultProjects[i]
        setStatusMsg(`Importing project (${i + 1}/${defaultProjects.length}): ${p.title}...`)

        const projectDoc = {
          _id: `project-${p.slug}`,
          _type: 'project',
          title: p.title,
          order: i + 1,
          slug: { _type: 'slug', current: p.slug },
          featured: i < 3,
          category: p.category || 'Residential',
          type: p.type || 'Boutique Residence',
          location: p.location || 'LUDHIANA',
          year: p.year || '2025',
          area: p.area || '',
          status: p.status || 'Completed',
          tagline: p.tagline || '',
          summary: p.description || '',
          concept: p.concept || [],
          materials: p.materials || [],
        }

        await client.createIfNotExists(projectDoc)
      }

      // 3. Initialize Insync Home Products
      setStatusMsg('Importing 20 Insync Home Products into Sanity...')
      for (let i = 0; i < DEFAULT_PRODUCTS.length; i++) {
        const prod = DEFAULT_PRODUCTS[i]
        setStatusMsg(`Importing product (${i + 1}/${DEFAULT_PRODUCTS.length}): ${prod.name}...`)

        const prodDoc = {
          _id: `decor-${prod.id}`,
          _type: 'decorProduct',
          name: prod.name,
          order: i + 1,
          no: prod.no,
          category: prod.category || 'Stone Furniture',
          desc: prod.desc || '',
          badge: prod.badge || 'Bespoke Stone',
          options: prod.options || 'Travertine · Marble · Onyx',
        }

        await client.createIfNotExists(prodDoc)
      }

      // 4. Initialize Global Site Settings & Studio Contact
      setStatusMsg('Setting up Global Site Settings & Studio Contact info...')
      await client.createIfNotExists({
        _id: 'siteSettings',
        _type: 'siteSettings',
        studioName: 'INSYNC INTERIORS',
        subName: 'by Ancchal',
        contactHeroTitle: 'LET’S BEGIN a quiet CONVERSATION.',
        contactHeroLede: 'Tell us about the space you imagine. We’ll listen first, then design.',
        enquireButtonText: 'ENQUIRE NOW',
        enquireButtonSubtitle: 'Begin your bespoke architectural commission',
        studioAddress: 'INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana – 141001',
        contactPhone: '+91 98774 17531',
        whatsappNumber: '919877417531',
        contactEmail: 'hello@insyncinteriors.com',
        studioHours: 'Monday – Saturday · 10:00 AM – 6:00 PM',
        mapQuery: 'INSYNC INTERIORS, SCF - 1, Third Floor, I Block Market, Sarabha Nagar (Opp. Nav Durga Mata Mandir), Ludhiana 141001',
        instagramUrl: 'https://www.instagram.com/insync_byancchal/',
        heroHeadline: 'Sculpting Timeless Architectural Spaces & Bespoke Interiors',
        heroSubtitle: 'A bespoke interior architecture studio based in Ludhiana, Punjab crafting timeless residential estates and curated spaces.',
        yearsExperience: 8,
        completedProjects: 65,
      })

      setStatusMsg('All items & Studio Contact Settings successfully initialized in Sanity!')
      setSuccess(true)
      await checkStatus()
    } catch (err) {
      console.error('Sync failed:', err)
      setErrorMsg(`Import failed: ${err.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: '40px 24px',
      maxWidth: '840px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#ECE6D8',
    }}>
      <div style={{
        background: '#141414',
        border: '1px solid rgba(197, 160, 89, 0.35)',
        borderRadius: '12px',
        padding: '36px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>⚡</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600, color: '#C5A059', letterSpacing: '0.04em' }}>
              Insync Catalog Sync &amp; Setup Tool
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#8C857B' }}>
              One-click initialize all 19 Interior Projects, 5 Disciplines, and 20 Home Products into your Sanity Studio.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          margin: '28px 0',
          padding: '18px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8C857B', display: 'block' }}>
              Interior Projects
            </span>
            <strong style={{ fontSize: '26px', color: stats.projects > 0 ? '#4ADE80' : '#F87171' }}>
              {stats.projects}
            </strong>
            <span style={{ fontSize: '12px', color: '#8C857B', display: 'block', marginTop: '2px' }}>
              {stats.projects > 0 ? '✓ Live in Sanity' : '0 in Studio (Empty)'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8C857B', display: 'block' }}>
              5 Disciplines
            </span>
            <strong style={{ fontSize: '26px', color: stats.hasServices ? '#4ADE80' : '#F87171' }}>
              {stats.hasServices ? '5' : '0'}
            </strong>
            <span style={{ fontSize: '12px', color: '#8C857B', display: 'block', marginTop: '2px' }}>
              {stats.hasServices ? '✓ Initialized' : 'Needs Setup'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8C857B', display: 'block' }}>
              Insync Home Products
            </span>
            <strong style={{ fontSize: '26px', color: stats.products > 0 ? '#4ADE80' : '#F87171' }}>
              {stats.products}
            </strong>
            <span style={{ fontSize: '12px', color: '#8C857B', display: 'block', marginTop: '2px' }}>
              {stats.products > 0 ? '✓ Live in Sanity' : '0 in Studio (Empty)'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8C857B', display: 'block' }}>
              Client Inquiries
            </span>
            <strong style={{ fontSize: '26px', color: '#C5A059' }}>
              {stats.inquiries}
            </strong>
            <span style={{ fontSize: '12px', color: '#8C857B', display: 'block', marginTop: '2px' }}>
              {stats.localInquiries > stats.inquiries
                ? `⚡ ${stats.localInquiries - stats.inquiries} pending sync`
                : '✓ All Synced'}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '6px',
            color: '#FCA5A5',
            fontSize: '13px',
            marginBottom: '20px',
          }}>
            {errorMsg}
          </div>
        )}

        {statusMsg && (
          <div style={{
            padding: '12px 16px',
            background: success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(197, 160, 89, 0.15)',
            border: `1px solid ${success ? 'rgba(34, 197, 94, 0.4)' : 'rgba(197, 160, 89, 0.4)'}`,
            borderRadius: '6px',
            color: success ? '#86EFAC' : '#E8D2A6',
            fontSize: '13px',
            marginBottom: '20px',
          }}>
            {statusMsg}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginTop: '24px' }}>
          <button
            onClick={handleSyncAll}
            disabled={loading}
            style={{
              padding: '13px 28px',
              background: loading ? '#555' : '#C5A059',
              color: '#141414',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '12.5px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(197, 160, 89, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Populating Studio...' : '⚡ Seed / Populate All Into Studio'}
          </button>

          <button
            onClick={handleSyncInquiries}
            disabled={loading}
            style={{
              padding: '13px 22px',
              background: 'transparent',
              color: '#C5A059',
              border: '1px solid #C5A059',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Syncing...' : '📥 Sync Client Leads to Sanity'}
          </button>

          {stats.projects > 0 && (
            <a
              href="/admin/structure"
              style={{
                padding: '13px 20px',
                background: 'transparent',
                color: '#ECE6D8',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Go to Structure View →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
