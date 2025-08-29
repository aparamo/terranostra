# Terranostra

A Next.js 15 application built with modern web technologies for sustainable living and eco-friendly services.

## 🚀 Production Deployment

This repository is configured for production deployment on Vercel.

### Prerequisites

- Node.js 18+ or Bun
- Environment variables configured

### Quick Start

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Build the application:**
   ```bash
   bun run build
   ```

3. **Start production server:**
   ```bash
   bun run start
   ```

### Environment Variables

Make sure to configure the following environment variables in your production environment:

- Database connection strings
- Stripe API keys
- Payload CMS configuration
- Next.js configuration

### Features

- 🌱 Sustainable living services
- 🛒 E-commerce functionality
- 🌍 Multi-language support (ES, EN, DE)
- 💳 Stripe payment integration
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

### Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Payload CMS
- **Database:** MongoDB with Drizzle ORM
- **Payments:** Stripe
- **Package Manager:** Bun

### Deployment

This application is optimized for Vercel deployment. The build process will automatically:

- Compile TypeScript
- Optimize images and assets
- Generate static pages where possible
- Bundle JavaScript efficiently

### Support

For production support and deployment issues, please refer to the deployment platform documentation.