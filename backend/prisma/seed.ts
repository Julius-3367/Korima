import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const servicesData = [
  {
    title: 'Custom Software & Systems',
    category: 'Software Engineering',
    description:
      'Workflow automation, ERP integrations, and bespoke platforms that mirror how Kenyan teams operate in the field and the boardroom.',
    valueProposition: 'Odoo, ERP, and API integrations delivered with local context.',
    featured: true,
  },
  {
    title: 'Point of Sale (POS) Systems',
    category: 'Retail Technology',
    description:
      'Complete POS solutions for butcheries, pharmacies, retail shops, wholesale, supermarkets, and all business types. Inventory management, sales tracking, receipt printing, and M-Pesa integration.',
    valueProposition: 'Affordable, cloud-based POS tailored for Kenyan retailers with offline support and mobile money.',
    featured: true,
  },
  {
    title: 'Website Design & Development',
    category: 'Web Experience',
    description:
      'Corporate websites, landing pages, and content hubs built for Kenyan audiences with SEO and performance baked in.',
    valueProposition: 'Fast, secure, and search-optimized experiences for East African brands.',
  },
  {
    title: 'Mobile App Development',
    category: 'Mobile',
    description:
      'Android and iOS apps with offline-first experiences, mobile money integrations, and secure identity flows.',
    valueProposition: 'Ship reliable mobile products that work from Nairobi to Turkana.',
  },
  {
    title: 'Digital Marketing & SEO',
    category: 'Growth',
    description:
      'Search, content, and performance campaigns that keep your pipeline full across Kenya, Uganda, and Rwanda.',
    valueProposition: 'Integrated paid + organic playbooks for African markets.',
  },
  {
    title: 'Data Analysis & Dashboards',
    category: 'Data',
    description:
      'Business intelligence programs, KPI dashboards, and predictive insights executives can trust.',
    valueProposition: 'Turn raw operational data into leadership-ready scorecards.',
  },
  {
    title: 'Technology Advisory',
    category: 'Advisory',
    description:
      'CTO-as-a-service, architecture reviews, cloud migrations, and cybersecurity assessments tailored for enterprises.',
    valueProposition: 'Strategic partners for boards, CIOs, and innovation teams.',
  },
];

const projectsData = [
  {
    title: 'Nairobi Health Connect',
    sector: 'Healthcare Platform',
    description:
      'Telemedicine marketplace connecting patients with specialists and MPESA billing, adopted by three Nairobi hospitals.',
    location: 'Nairobi, Kenya',
    impact: '10k+ consultations facilitated within six months.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    title: 'SafariPay Mobile Wallet',
    sector: 'Fintech & Mobile',
    description:
      'Cross-border wallet with merchant collections, FX, and settlement tools for Kenya, Uganda, and Rwanda.',
    location: 'Nairobi, Kampala, Kigali',
    impact: 'Processes $4M monthly volume with <1% failure rate.',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Umoja Retail Intelligence',
    sector: 'Analytics & BI',
    description:
      'Data warehouse and dashboard suite tracking 1,200 FMCG outlets with predictive inventory planning.',
    location: 'Kenya',
    impact: 'Reduced stock-outs by 34% across the network.',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'CountyWorks Odoo ERP',
    sector: 'Public Sector',
    description:
      'Government ERP covering procurement, HR, and inspections with role-based dashboards for county leadership.',
    location: 'Kenyan Counties',
    impact: 'Digitised seven core processes across three counties.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
];

const blogPostsData = [
  {
    title: 'Building Human Software for East Africa',
    slug: 'building-software-for-east-africa',
    excerpt:
      'How Korima approaches discovery workshops, inclusive research, and localized user testing when launching new products in Nairobi.',
    content:
      'We begin every engagement by understanding founders, frontline teams, and end users spread across Kenya. Co-creation sessions in Westlands, warehouse shadowing in Industrial Area, and Kisumu field visits keep us grounded. Prototypes ship fast, user tests happen weekly, and mobile money plus offline sync are non-negotiable.',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    author: 'Faith Wanjiru',
    tags: ['Product Strategy', 'Design Research'],
    readMinutes: 7,
    publishedAt: new Date('2025-01-15T06:00:00Z'),
    status: 'published',
  },
  {
    title: 'SEO Playbook for Kenyan Brands',
    slug: 'seo-playbook-for-kenyan-brands',
    excerpt:
      'A practical optimisation guide that helps hospitality, legal, and logistics clients dominate local search results.',
    content:
      'We map buyer journeys specific to counties and cities, then build authority content anchored on Kenyan FAQs. Structured data, lightning-fast hosting, and partnerships with African publications create durable rankings. Layer marketing automation for a predictable inbound engine.',
    heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    author: 'Brian Otieno',
    tags: ['SEO', 'Digital Marketing'],
    readMinutes: 6,
    publishedAt: new Date('2025-02-02T06:00:00Z'),
    status: 'published',
  },
  {
    title: 'Data Analytics Leaders Actually Use',
    slug: 'data-analytics-for-leadership',
    excerpt:
      'Lessons from deploying executive dashboards for finance, operations, and field teams across the region.',
    content:
      'Executives do not need 40 charts—they want decisive metrics. We co-create KPI scorecards that refresh in near-real time and run secure on any device. Governance, data quality, and literacy coaching are embedded so teams leave confident, not overwhelmed.',
    heroImage: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=900&q=80',
    author: 'Esther Achieng',
    tags: ['Data', 'Leadership'],
    readMinutes: 5,
    publishedAt: new Date('2025-03-10T06:00:00Z'),
    status: 'published',
  },
];

async function main() {
  // Clear existing data
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.admin.deleteMany();

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.create({
    data: {
      email: 'admin@korima.co.ke',
      password: hashedPassword,
      name: 'Korima Admin',
      role: 'admin',
    },
  });

  // Seed data
  await prisma.service.createMany({ data: servicesData });
  await prisma.project.createMany({ data: projectsData });
  await prisma.blogPost.createMany({ data: blogPostsData });

  console.log('✅ Database seeded successfully');
  console.log('📧 Admin login: admin@korima.co.ke');
  console.log('🔑 Password: admin123');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
