# 🚀 Deployment Guide - Client-Centered Online Store

## Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository
1. **Push your code to GitHub** (if not already done)
2. **Make sure all files are committed**

### Step 2: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the following:**

#### Environment Variables
Set these in the Vercel dashboard under "Environment Variables":

```
DATABASE_URL=file:./prod.db
JWT_SECRET=your-super-secret-jwt-key-for-production-change-this
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key_here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_here
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-for-production
```

#### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 3: Post-Deployment Setup

After deployment, you'll need to set up the database:

1. **Access your deployed app**
2. **Run the database setup** (you can create an admin endpoint for this)

## Alternative Deployment Options

### Deploy to Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Deploy to Railway
1. Connect your GitHub repo to Railway
2. Railway will auto-detect Next.js
3. Add environment variables in Railway dashboard

### Deploy to Render
1. Connect your GitHub repo to Render
2. Choose "Web Service"
3. Set build command: `npm run build`
4. Set start command: `npm start`

## Database Setup for Production

### Option 1: SQLite (Current Setup)
- Works for small to medium applications
- Database file is included in deployment
- No additional setup required

### Option 2: PostgreSQL (Recommended for Production)
1. **Use a service like:**
   - [Neon](https://neon.tech) (Free tier available)
   - [Supabase](https://supabase.com) (Free tier available)
   - [PlanetScale](https://planetscale.com) (Free tier available)
   - [Railway](https://railway.app) (Free tier available)

2. **Update your DATABASE_URL** to the PostgreSQL connection string
3. **Update prisma/schema.prisma**:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

## Environment Variables Reference

### Required Variables
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Secret key for JWT tokens (generate a strong random string)
- `NEXTAUTH_SECRET`: Secret for NextAuth (generate a strong random string)

### Optional Variables
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key for payments
- `STRIPE_SECRET_KEY`: Stripe secret key for payments
- `NEXTAUTH_URL`: Your app URL (auto-detected by Vercel)

## Security Checklist

- [ ] Change all default secrets
- [ ] Use HTTPS in production
- [ ] Set up proper CORS if needed
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Backup your database regularly

## Testing Your Deployment

1. **Visit your deployed URL**
2. **Test the homepage**
3. **Try registering a new account**
4. **Test the demo login**: `demo@client.com` / `demo123`
5. **Browse products and test cart functionality**
6. **Test the admin panel**

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation passes
- Check for missing environment variables

### Database Errors
- Verify DATABASE_URL is correct
- Check if database exists and is accessible
- Run database migrations if needed

### Runtime Errors
- Check server logs in Vercel dashboard
- Verify all environment variables are set
- Check for CORS issues if calling APIs from frontend

## Monitoring and Maintenance

### Set up monitoring:
- **Vercel Analytics** (built-in)
- **Sentry** for error tracking
- **LogRocket** for session replay

### Regular maintenance:
- Update dependencies monthly
- Monitor database size
- Review and rotate secrets quarterly
- Backup database regularly

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Review the application logs
3. Test locally first
4. Check environment variables
5. Verify database connectivity

---

**Your client-centered online store is ready for production! 🎉**