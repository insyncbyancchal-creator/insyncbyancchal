import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { CatalogSyncTool } from './src/sanity/tools/CatalogSyncTool'
import { StudioAutoSyncNavbar } from './src/sanity/components/StudioAutoSyncNavbar'

export default defineConfig({
  name: 'insync-atelier',
  title: 'Insync by Ancchal Studio CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5g37myau',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Insync Content')
          .items([
            // 0. Navbar & Social Links (Mail, WhatsApp, Insta)
            S.listItem()
              .title('⭐ Navbar Links (Mail, WhatsApp, Insta)')
              .id('navbarLinksItem')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Navbar & Social Links (Mail, WhatsApp, Instagram)')
              ),

            S.divider(),

            // 1. Home Page
            S.listItem()
              .title('1. Home Page')
              .id('homePageItem')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Home Page Content')
              ),

            // 2. About Page
            S.listItem()
              .title('2. About Page')
              .id('aboutPageItem')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
                  .title('About Page Content')
              ),

            // 3. Interior Projects (Portfolio)
            S.listItem()
              .title('3. Interior Projects (Portfolio)')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Interior Projects')),

            S.divider(),

            // 4. Services Page & 5 Disciplines
            S.listItem()
              .title('4. Services & 5 Disciplines')
              .id('servicesPageItem')
              .child(
                S.document()
                  .schemaType('servicesPage')
                  .documentId('servicesPage')
                  .title('Services Page & 5 Disciplines')
              ),

            // 5. Insync Home Products
            S.listItem()
              .title('5. Insync Home Products')
              .schemaType('decorProduct')
              .child(S.documentTypeList('decorProduct').title('Insync Home Products')),

            // 6. Inquiries & Leads
            S.listItem()
              .title('6. Inquiries & Leads')
              .schemaType('contactSubmission')
              .child(
                S.documentTypeList('contactSubmission')
                  .title('Client Inquiries & Leads')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),

            S.divider(),

            // 7. Client Reviews
            S.listItem()
              .title('7. Client Reviews')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Client Reviews')),

            // 8. Studio Contact & Site Settings
            S.listItem()
              .title('8. Studio Contact & Site Settings')
              .id('siteSettingsItem')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Studio Contact & Site Settings')
              ),
          ]),
    }),
    visionTool(),
  ],

  tools: (prev) => [
    ...prev,
    {
      name: 'catalog-sync',
      title: '⚡ Setup / Seed Catalog',
      component: CatalogSyncTool,
    },
  ],

  studio: {
    components: {
      navbar: StudioAutoSyncNavbar,
    },
  },

  schema: {
    types: schemaTypes,
  },
})
