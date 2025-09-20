-- Supabase setup script for Sticky Cart Drawer
-- Run this in your Supabase SQL editor

-- Create shop_settings table to store all app configurations
CREATE TABLE IF NOT EXISTS shop_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_domain TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security needs)
-- In production, you might want more restrictive policies
CREATE POLICY "Allow all operations on shop_settings" ON shop_settings
FOR ALL USING (true);

-- Create index for faster lookups by shop domain
CREATE INDEX IF NOT EXISTS idx_shop_settings_shop_domain ON shop_settings(shop_domain);

-- Create index for faster lookups by updated_at for caching
CREATE INDEX IF NOT EXISTS idx_shop_settings_updated_at ON shop_settings(updated_at);

-- Optional: Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row changes
CREATE TRIGGER update_shop_settings_updated_at 
    BEFORE UPDATE ON shop_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some example settings (optional, for testing)
-- Uncomment the following lines if you want to insert test data
/*
INSERT INTO shop_settings (shop_domain, settings) VALUES 
('example-store.myshopify.com', '{
  "cartEnabled": true,
  "drawerPosition": "right",
  "themeColor": "#000000",
  "stickyButtonEnabled": true,
  "stickyButtonText": "Cart",
  "stickyButtonPosition": "bottom-right",
  "upsellsEnabled": false,
  "upsellProducts": [],
  "addOnsEnabled": false,
  "addOnProducts": [],
  "freeShippingEnabled": false,
  "freeShippingThreshold": 50,
  "discountEnabled": false,
  "discountCode": "",
  "announcementEnabled": false,
  "announcementText": "",
  "fbPixelId": "",
  "googleAdsId": ""
}'::jsonb);
*/