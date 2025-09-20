# Sticky Cart Drawer - Setup Guide

This guide walks you through setting up the Sticky Cart Drawer Shopify app from development to production deployment.

## Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] Shopify CLI 3.0+ installed
- [ ] Shopify Partner account created
- [ ] Supabase account created
- [ ] Vercel account created
- [ ] GitHub account created

## Step 1: Initial Project Setup

### 1.1 Clone and Install

```bash
git clone <your-repo-url>
cd sticky-cart-drawer
npm install
cp .env.example .env
```

### 1.2 Configure Shopify CLI

```bash
# Login to Shopify CLI
shopify auth login

# Link to your app (if you already created one in Partner Dashboard)
shopify app config link

# OR create a new app
shopify app init --template=remix
```

## Step 2: Supabase Setup

### 2.1 Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Wait for the project to be fully initialized
3. Go to Settings > API and copy:
   - Project URL
   - anon/public key

### 2.2 Setup Database

1. Go to the SQL Editor in your Supabase dashboard
2. Run the contents of `supabase-setup.sql`:

```sql
-- Create shop_settings table
CREATE TABLE IF NOT EXISTS shop_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_domain TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on shop_settings" ON shop_settings
FOR ALL USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_shop_settings_shop_domain ON shop_settings(shop_domain);
CREATE INDEX IF NOT EXISTS idx_shop_settings_updated_at ON shop_settings(updated_at);
```

### 2.3 Update Environment Variables

Add to your `.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

## Step 3: Shopify App Configuration

### 3.1 Partner Dashboard Setup

1. Go to https://partners.shopify.com
2. Create a new app or edit existing app
3. Note your API key and API secret

### 3.2 Configure App Settings

Update your `.env` file:

```env
SHOPIFY_API_KEY=your_api_key_from_partner_dashboard
SHOPIFY_API_SECRET=your_api_secret_from_partner_dashboard
SHOPIFY_APP_URL=https://your-app-url.vercel.app (update after Vercel deployment)
SCOPES=write_themes,write_script_tags,read_products,read_orders,write_cart_transforms
SHOPIFY_APP_SESSION_SECRET=your_random_32_char_secret
```

### 3.3 Generate Session Secret

```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Development Testing

### 4.1 Start Development Server

```bash
npm run dev
```

This will:
- Start the Remix development server
- Create a secure tunnel for local development
- Open your app in a development store

### 4.2 Test Basic Functionality

1. Install the app in your development store
2. Grant required permissions
3. Configure settings in the admin panel
4. Test the cart drawer on your storefront

### 4.3 Verify Integration

Check these items work correctly:
- [ ] Script tag is created automatically
- [ ] Cart drawer opens when clicking add to cart
- [ ] Settings save and load correctly
- [ ] Sticky button appears and functions
- [ ] Mobile responsiveness works

## Step 5: Production Deployment

### 5.1 Prepare for Deployment

1. Push your code to GitHub
2. Ensure all sensitive data is in environment variables
3. Test thoroughly in development

### 5.2 Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Deploy

#### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### 5.3 Configure Environment Variables in Vercel

Add all environment variables from your `.env` file to Vercel:

```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-app-name.vercel.app
SCOPES=write_themes,write_script_tags,read_products,read_orders,write_cart_transforms
SHOPIFY_APP_SESSION_SECRET=your_session_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
DATABASE_URL=file:./dev.sqlite
```

## Step 6: Update App Configuration

### 6.1 Update shopify.app.toml

```toml
name = "Sticky Cart Drawer"
client_id = "your_api_key"
application_url = "https://your-app-name.vercel.app"
embedded = true

[auth]
redirect_urls = [
  "https://your-app-name.vercel.app/auth/callback",
  "https://your-app-name.vercel.app/auth/shopify/callback",
  "https://your-app-name.vercel.app/api/auth/callback"
]

[app_proxy]
url = "https://your-app-name.vercel.app"
subpath = "tools/cart-drawer"
prefix = "apps"
```

### 6.2 Update Partner Dashboard

1. Go to your app in the Partner Dashboard
2. Update App URL to your Vercel URL
3. Update redirect URLs to match your production URLs
4. Configure App Proxy:
   - **Subpath prefix**: `apps`
   - **Subpath**: `cart-drawer`  
   - **URL**: `https://your-app-name.vercel.app`

## Step 7: App Store Submission (Optional)

### 7.1 Prepare for Review

1. Test thoroughly on multiple stores and themes
2. Create app listing assets (screenshots, descriptions)
3. Set up proper pricing and billing
4. Complete privacy policy and terms of service

### 7.2 Submit for Review

1. In Partner Dashboard, go to App Store listing
2. Fill out all required information
3. Submit for review
4. Respond to any feedback from Shopify review team

## Step 8: Monitoring & Maintenance

### 8.1 Set up Monitoring

1. Monitor Vercel function logs
2. Check Supabase database performance
3. Monitor app installation and usage

### 8.2 Regular Maintenance

- Keep dependencies updated
- Monitor Shopify API changes
- Update app as needed for new Shopify features
- Respond to merchant feedback

## Troubleshooting

### Common Issues

**App won't install:**
- Check redirect URLs match exactly
- Verify API credentials are correct
- Ensure scopes are properly configured

**Settings not saving:**
- Check Supabase connection
- Verify table exists and has correct structure
- Check browser console for errors

**Cart drawer not appearing:**
- Verify script tag was created
- Check app proxy configuration
- Ensure cart drawer is enabled in settings

**Performance issues:**
- Check Vercel function timeout settings
- Optimize database queries
- Consider adding caching

### Getting Help

1. Check Shopify developer documentation
2. Review Vercel deployment logs
3. Check Supabase logs and metrics
4. Join Shopify developer communities

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **CORS**: App proxy handles CORS automatically
3. **Rate Limiting**: Shopify handles API rate limiting
4. **Data Privacy**: Store only necessary merchant data
5. **GDPR Compliance**: Handle data deletion requests properly

## Performance Optimization

1. **Caching**: Settings are cached to reduce database queries
2. **Bundle Size**: Cart drawer JavaScript is optimized for performance
3. **Database**: Proper indexing on frequently queried columns
4. **CDN**: Vercel provides global CDN automatically

---

You now have a production-ready Shopify app! 🎉

For ongoing support and updates, refer to the main README.md file.