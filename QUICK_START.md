# 🎯 Korima Platform - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Start Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:4000
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### 3. Login to Admin
- URL: http://localhost:5173/login
- Email: admin@korima.co.ke
- Password: admin123

## 📍 Key URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000/api
- **Health Check:** http://localhost:4000/api/health
- **Blog Admin:** http://localhost:5173/blog/admin
- **Login:** http://localhost:5173/login

## 🔑 Important Commands

```bash
# Backend
npm run dev              # Start dev server
npm run build            # Build for production
npm run seed             # Seed database
npx prisma migrate dev   # Create migration
npx prisma studio        # Open Prisma Studio

# Frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Docker
docker-compose up -d     # Start all services
docker-compose down      # Stop all services
docker-compose logs -f   # View logs
```

## ✅ Features Checklist

### ✨ Implemented Features

#### Security & Auth
- [x] JWT authentication
- [x] Protected admin routes
- [x] Rate limiting
- [x] CORS protection
- [x] Input validation
- [x] GDPR cookie consent

#### Content Management
- [x] Blog CRUD operations
- [x] Image uploads with optimization
- [x] Draft/Published/Archived status
- [x] Soft deletes
- [x] Tags and categorization
- [x] SEO meta fields

#### SEO
- [x] Dynamic meta tags
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Structured data
- [x] Open Graph tags

#### Communication
- [x] Contact form with email
- [x] Newsletter signup
- [x] Welcome emails
- [x] SMTP integration

#### Advanced
- [x] Blog pagination
- [x] Search functionality
- [x] Related posts
- [x] View tracking
- [x] Winston logging
- [x] Health checks

#### Deployment
- [x] Docker setup
- [x] Docker Compose
- [x] CI/CD pipeline
- [x] Nginx config
- [x] Environment vars

#### Legal & Compliance
- [x] Privacy Policy
- [x] Cookie Policy
- [x] Terms of Service
- [x] GDPR consent

## 📧 Email Setup (Gmail)

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to Security → App Passwords
   - Select "Mail" and "Other"
   - Copy the 16-character password
4. Update `.env`:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

## 🔒 Security Best Practices

### Before Production:
1. Change admin password
2. Set strong JWT_SECRET (32+ random characters)
3. Update CORS_ORIGIN to production domain
4. Enable HTTPS/SSL
5. Review rate limits
6. Set up database backups
7. Configure error monitoring

### Generate Secure JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📊 API Quick Reference

### Public APIs
```bash
# Get blog posts (with pagination)
GET /api/blog?page=1&limit=10&search=keyword&tag=tagname

# Get single post
GET /api/blog/building-software-for-east-africa

# Submit contact form
POST /api/contact
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "message": "Hello",
  "gdprConsent": "true"
}

# Subscribe to newsletter
POST /api/newsletter/subscribe
{
  "email": "john@example.com"
}
```

### Admin APIs (Requires JWT)
```bash
# Login
POST /api/auth/login
{
  "email": "admin@korima.co.ke",
  "password": "admin123"
}

# Create blog post
POST /api/blog
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
{
  "title": "My Post",
  "excerpt": "Short description...",
  "content": "Full content...",
  "image": <file>,
  "tags": "Tech,Kenya",
  "status": "published"
}

# Update post
PUT /api/blog/1
Headers: Authorization: Bearer <token>

# Delete post (soft delete)
DELETE /api/blog/1
Headers: Authorization: Bearer <token>
```

## 🐛 Troubleshooting

### Backend won't start
- Check MariaDB is running
- Verify DATABASE_URL in .env
- Run `npx prisma generate`
- Check port 4000 is available

### Frontend can't connect to API
- Check VITE_API_URL in frontend/.env
- Verify backend is running
- Check CORS settings

### Login not working
- Verify admin was created: `npm run seed`
- Check JWT_SECRET is set
- Clear browser localStorage

### Images not uploading
- Check `backend/uploads/blog` exists
- Verify file permissions
- Check multer configuration

### Emails not sending
- Verify SMTP credentials
- Check Gmail app password (not account password)
- Test SMTP connection
- Check spam folder

## 📱 Testing Checklist

- [ ] Homepage loads
- [ ] Services page displays data
- [ ] Projects page displays data
- [ ] Blog lists all posts
- [ ] Single blog post loads
- [ ] Contact form submits
- [ ] Newsletter signup works
- [ ] Cookie consent appears
- [ ] Admin login works
- [ ] Create blog post
- [ ] Upload images
- [ ] Edit blog post
- [ ] Delete blog post
- [ ] Logout works
- [ ] Email notifications send
- [ ] SEO meta tags present
- [ ] Mobile responsive

## 🎨 Customization

### Change Brand Colors
Edit `frontend/src/index.css`:
```css
:root {
  --primary: #1a472a;  /* Main green */
  --secondary: #3a7ed6; /* Blue */
  --lime-500: #84cc16;  /* Accent */
}
```

### Update Logo
Replace `frontend/public/logo.svg`

### Modify Content
- Services: `backend/prisma/seed.ts`
- Projects: `backend/prisma/seed.ts`
- Blog: Use admin panel

## 📞 Support

**Korima Technologies**
- Email: korirjuliu001@gmail.com
- Phone: +254 707 670 780
- WhatsApp: +254 707 670 780
- Location: Westlands, Viking House, Nairobi

---

**Ready to deploy?** Follow the production checklist in README.md
