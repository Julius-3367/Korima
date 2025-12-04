# 🚀 Korima - Enterprise Website Platform

A professional full-stack website platform for Korima Technologies, built with modern web technologies and enterprise-grade features.

## ✨ Features

### 🔐 Security & Authentication
- JWT-based admin authentication
- Protected blog admin panel
- Rate limiting on all API endpoints
- CORS protection
- Helmet.js security headers
- Input validation and sanitization
- GDPR-compliant cookie consent

### 📝 Content Management
- Full blog CMS with rich text support
- Image upload with automatic optimization
- Draft/Published/Archived post status
- Soft deletes for data recovery
- Tag-based content organization
- SEO meta fields (title, description)
- View tracking and analytics

### 🎯 SEO Optimization
- Dynamic meta tags for all pages
- Open Graph and Twitter Card support
- Sitemap.xml generation
- Robots.txt configuration
- Structured data (JSON-LD)
- Canonical URLs

### 📧 Communication
- Contact form with email notifications
- Newsletter subscription system
- Welcome email automation
- SMTP integration (Gmail/SendGrid)
- GDPR consent tracking

### 🔍 Advanced Features
- Blog pagination and search
- Related posts by tags
- Image optimization (Sharp)
- Soft delete with audit trail
- Winston logging system
- Health check endpoint
- API rate limiting

### 🎨 User Experience
- Responsive design
- Cookie consent management
- Privacy/Terms/Cookie policy pages
- WhatsApp integration
- Loading states and error handling

### 🐳 DevOps & Deployment
- Docker containerization
- Docker Compose orchestration
- GitHub Actions CI/CD
- Environment variable management
- Production-ready Nginx config

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Database:** MariaDB with Prisma ORM
- **Authentication:** JWT (jsonwebtoken)
- **Security:** Helmet, CORS, express-rate-limit
- **Validation:** Zod, express-validator
- **Email:** Nodemailer
- **Image Processing:** Sharp
- **Logging:** Winston

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router
- **Styling:** Custom CSS
- **API Client:** Fetch API

## 📦 Installation

### Prerequisites
- Node.js 20+
- MariaDB 11+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database and SMTP credentials

# Run migrations
npx prisma migrate deploy

# Seed database (creates admin user)
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

## 🔑 Default Admin Credentials

After seeding the database:

- **Email:** admin@korima.co.ke
- **Password:** admin123

⚠️ **Change these credentials in production!**

## 📡 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/services` - List services
- `GET /api/projects` - List projects
- `GET /api/blog` - List published blog posts (with pagination/search)
- `GET /api/blog/:slug` - Get single blog post
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Protected Endpoints (require JWT)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Soft delete blog post

### Query Parameters

#### Blog Listing
- `?page=1` - Page number
- `?limit=10` - Items per page
- `?search=keyword` - Search posts
- `?tag=tagname` - Filter by tag
- `?status=published` - Filter by status

## 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔒 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/korima"

# Server
PORT=4000
NODE_ENV=development

# Security
JWT_SECRET=your-secure-random-string
CORS_ORIGIN=http://localhost:5173

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@korima.co.ke
CONTACT_EMAIL=korirjuliu001@gmail.com

# Logging
LOG_LEVEL=info
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:4000/api
```

## 📊 Database Schema

### Models
- **Service** - Company services
- **Project** - Portfolio projects
- **BlogPost** - Blog content with SEO fields
- **Admin** - Admin users
- **ContactMessage** - Contact form submissions
- **NewsletterSubscriber** - Email subscribers

## 🚀 Production Checklist

- [ ] Change default admin password
- [ ] Set secure JWT_SECRET
- [ ] Configure SMTP credentials
- [ ] Update CORS_ORIGIN to production domain
- [ ] Set up SSL/HTTPS
- [ ] Configure database backups
- [ ] Set up error monitoring (Sentry)
- [ ] Review rate limits
- [ ] Test email delivery
- [ ] Verify sitemap.xml
- [ ] Submit sitemap to Google Search Console

## 📝 Usage Guide

### Creating Blog Posts

1. Login at `/login` with admin credentials
2. Navigate to `/blog/admin`
3. Fill in the form:
   - Title (required)
   - Slug (auto-generated if empty)
   - Excerpt (required, 20-320 chars)
   - Content (required, min 50 chars)
   - Author (optional, defaults to "Korima Team")
   - Tags (comma-separated)
   - Read time (minutes)
   - Hero image (upload)
4. Click "Create Post"

### Managing Content

- **Edit:** Click "Edit" on any post in the admin panel
- **Delete:** Click "Delete" (soft delete, recoverable)
- **View:** Posts appear on `/blog` when published

### Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use app password as SMTP_PASS

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📄 License

Proprietary - Korima Technologies © 2025

## 👥 Team

Built by Korima Technologies
- Website: https://korima.co.ke
- Email: korirjuliu001@gmail.com
- Phone: +254 707 670 780
- Location: Westlands, Viking House, Nairobi, Kenya

## 🔄 Updates & Changelog

### v1.0.0 (December 2025)
- Initial professional release
- Full authentication system
- SEO optimization
- Email integration
- Docker deployment
- CI/CD pipeline
- Legal pages (Privacy, Terms, Cookies)
- GDPR compliance
- Image optimization
- Advanced blog features

---

**Need help?** Contact us at korirjuliu001@gmail.com or WhatsApp +254 707 670 780
