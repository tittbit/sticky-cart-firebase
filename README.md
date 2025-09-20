# Sticky Cart Drawer - Shopify App

A modern, responsive cart drawer app for Shopify stores that boosts average order value and reduces cart abandonment. Built with Remix, Node.js, and Supabase.

## Features

### 🛒 Core Cart Features
- **Slide-out Cart Drawer**: Modern, responsive drawer that replaces Shopify's native cart
- **Sticky Cart Button**: Persistent button with cart count that opens the drawer
- **Mobile-First Design**: Optimized for mobile with touch-friendly interactions
- **Theme Integration**: Automatically matches your store's theme colors

### 📈 Sales Optimization
- **Product Upsells**: Show "Frequently Bought Together" recommendations
- **Add-On Products**: Optional products via checkboxes (shipping protection, warranties)
- **Free Shipping Bar**: Progress bar showing amount needed for free shipping
- **Discount Promotions**: Featured discount codes with apply functionality
- **Announcement Banners**: Custom promotional messages

### 📊 Analytics & Tracking
- **Facebook Pixel Integration**: Track AddToCart, RemoveFromCart events
- **Google Ads Tracking**: Conversion tracking for discount applications
- **Performance Analytics**: View order data and billing tier information

### ⚙️ Easy Configuration
- **No Code Required**: Everything configurable via embedded admin panel
- **Real-Time Preview**: See exactly how your cart will look before going live
- **Modular Features**: Toggle any feature on/off independently
- **Auto-Installation**: Script injection and setup handled automatically

## Tech Stack

- **Frontend**: Remix (React), Shopify Polaris
- **Backend**: Node.js, Shopify Admin API
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (free tier)
- **Integration**: Shopify CLI, App Bridge

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- Shopify CLI 3.0+
- Shopify Partner account
- Supabase account
- Vercel account
- GitHub account

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone <your-repo-url>
cd sticky-cart-drawer

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### 2. Configure Shopify App

```bash
# Login to Shopify CLI
shopify auth login

# Create new app (or link existing)
shopify app init

# Link to your app
shopify app config link
```

### 3. Setup Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API and copy your Project URL and anon key
3. Create the required table:

```sql
-- Create shop_settings table
CREATE TABLE shop_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_domain TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;

-- Create policy (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on shop_settings" ON shop_settings
FOR ALL USING (true);
```

4. Update your `.env` file with Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

### 4. Configure Environment Variables

Update your `.env` file with all required values:

```env
# From your Shopify Partner Dashboard
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret

# Your app's public URL (will be your Vercel URL)
SHOPIFY_APP_URL=https://your-app-url.vercel.app

# Required scopes for the app
SCOPES=write_themes,write_script_tags,read_products,read_orders,write_cart_transforms

# Generate a random string for session security
SHOPIFY_APP_SESSION_SECRET=your_random_session_secret

# Supabase credentials
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### 5. Setup App Proxy

1. Go to your Shopify Partner Dashboard
2. Navigate to your app > App setup
3. Configure App Proxy:
   - **Subpath prefix**: `apps`
   - **Subpath**: `cart-drawer`
   - **URL**: `https://your-app-url.vercel.app`

### 6. Development

```bash
# Start development server
npm run dev

# This will:
# - Start the Remix dev server
# - Create a tunnel for local development
# - Open your app in a development store
```

### 7. Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

```bash
# Optional: Deploy via Vercel CLI
npm install -g vercel
vercel --prod
```

### 8. Update App URLs

After deployment, update your `shopify.app.toml` and Shopify Partner Dashboard with your production URLs:

```toml
application_url = "https://your-app-url.vercel.app"

[auth]
redirect_urls = [
  "https://your-app-url.vercel.app/auth/callback",
  "https://your-app-url.vercel.app/auth/shopify/callback"
]

[app_proxy]
url = "https://your-app-url.vercel.app"
```

## Usage

### For Merchants

1. **Install the App**: Find and install from Shopify App Store
2. **Grant Permissions**: Approve required permissions during installation
3. **Configure Settings**: Use the embedded admin panel to customize:
   - Enable/disable cart drawer
   - Set theme colors and positioning
   - Configure upsell and add-on products
   - Set free shipping thresholds
   - Add discount codes and announcements
   - Set up analytics tracking IDs
4. **Preview Changes**: Use the real-time preview to see changes before going live
5. **Go Live**: Save settings and the cart drawer is automatically active

### Key Features Configuration

#### Cart Drawer Settings
- Toggle cart drawer on/off
- Choose drawer position (left/right)
- Customize theme colors
- Configure sticky button text and position

#### Product Recommendations
- Select upsell products via product picker
- Choose add-on products (e.g., warranties, shipping protection)
- Products appear automatically based on cart contents

#### Promotions
- Set free shipping threshold with progress bar
- Feature discount codes with one-click apply
- Display promotional announcements

#### Analytics
- Add Facebook Pixel ID for conversion tracking
- Add Google Ads conversion tracking
- View order analytics and billing information

## API Reference

### App Proxy Endpoints

The app uses Shopify's App Proxy feature to securely serve cart settings to the storefront:

#### GET `/apps/cart-drawer/api/settings?shop={shop-domain}`

Returns the cart drawer configuration for a specific shop.

**Response:**
```json
{
  "success": true,
  "settings": {
    "cartEnabled": true,
    "drawerPosition": "right",
    "themeColor": "#000000",
    "stickyButtonEnabled": true,
    "stickyButtonText": "Cart",
    "upsellsEnabled": false,
    "freeShippingEnabled": true,
    "freeShippingThreshold": 50,
    // ... other settings
  },
  "lastUpdated": "2024-01-01T12:00:00Z"
}
```

### JavaScript API

The cart drawer exposes a global API for custom integrations:

```javascript
// Open the cart drawer
window.StickyCartDrawer.open();

// Close the cart drawer
window.StickyCartDrawer.close();

// Refresh cart data
window.StickyCartDrawer.refresh();

// Update settings dynamically
window.StickyCartDrawer.updateSettings({
  themeColor: '#ff0000',
  drawerPosition: 'left'
});
```

### Event Tracking

The app automatically tracks these events for analytics:

- `AddToCart`: When items are added to cart
- `RemoveFromCart`: When items are removed from cart
- `UpdateCart`: When quantities are changed
- `AddPaymentInfo`: When discount codes are applied

## Billing & Pricing

The app uses Shopify's Billing API with these tiers:

- **Free**: Development stores only
- **Starter ($29.99/mo)**: 0-200 orders, 14-day free trial
- **Growth ($34.99/mo)**: 201-500 orders, 14-day free trial  
- **Professional ($54.99/mo)**: 501-1000 orders, 14-day free trial

Billing is handled automatically based on the store's order count.

## Troubleshooting

### Common Issues

1. **Cart Drawer Not Appearing**
   - Check that the app is installed and permissions granted
   - Verify the script tag was created (Admin API > Script Tags)
   - Ensure cart drawer is enabled in settings

2. **Settings Not Saving**
   - Check Supabase connection and credentials
   - Verify the shop_settings table exists
   - Check browser console for errors

3. **App Proxy Not Working**
   - Verify App Proxy configuration in Partner Dashboard
   - Check that the proxy URL matches your deployed app
   - Ensure the subpath is `apps/cart-drawer`

4. **Native Cart Still Showing**
   - The app automatically disables native cart when enabled
   - If issues persist, check for theme customizations that might interfere
   - Verify the script tag is loading on all pages

### Debug Mode

Enable debug logging by adding to your script:

```javascript
// Add to cart-drawer.js for debugging
localStorage.setItem('cartDrawerDebug', 'true');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with a development store
5. Submit a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For support and questions:
- GitHub Issues for bug reports and feature requests
- Check the troubleshooting section above
- Review Shopify's App Development documentation

---

**Built with ❤️ for Shopify merchants who want to boost their sales and improve customer experience.**