# Admin Setup Guide

## Initial Setup

Your report management system is now ready! Here's how to get started:

### 1. Create Your First Admin User

Since this is your first time setting up the system, you'll need to create an admin user in Supabase:

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User**
4. Enter your email and password
5. Click **Create User**

#### Option B: Using Supabase SQL Editor

Run this SQL command in the Supabase SQL Editor:

```sql
-- This will create a user with email/password authentication
-- Replace 'your-email@example.com' and 'your-secure-password' with your credentials
```

### 2. Set Up Storage Bucket for PDFs

1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket**
3. Name it: `reports`
4. Make it **Public**
5. Click **Create bucket**

### 3. Migrate Existing Reports to Database

Once you've created your admin user and logged in:

1. Open your browser's Developer Console (F12)
2. Navigate to the **Console** tab
3. Run this command to migrate the existing hardcoded reports:

```javascript
// Import the migration function
import { migrateReportsToDatabase } from './src/utils/migrateReports.ts';

// Run the migration
await migrateReportsToDatabase();
```

Alternatively, you can manually create the reports one by one using the admin interface.

### 4. Access the Admin Dashboard

1. Navigate to your site
2. Go to `/login` or click the login link
3. Sign in with your admin credentials
4. You'll be redirected to the admin dashboard

### 5. Create Your First Report

From the admin dashboard:

1. Click **New Report**
2. Fill in all required fields:
   - Title
   - Type (e.g., "Long Recommendation", "Research")
   - Analyst name
   - Date
   - Recommendation (Long, Short, Research, Case Study)
   - Icon (choose from dropdown)
   - Color theme
   - Summary (brief description for card)
   - Content (use the rich text editor)
3. Optionally upload a PDF file
4. Click **Create Report**

## Features

### Admin Dashboard
- View all reports in a table
- Edit existing reports
- Delete reports (with confirmation)
- Quick navigation to create new reports

### Report Editor
- Rich text editor with formatting options:
  - Bold, italic text
  - Headings (H1, H2)
  - Bullet and numbered lists
  - Horizontal rules
  - Paragraphs
- Metadata fields for all report details
- Optional PDF upload
- Color and icon customization
- Live preview

### Public Reports Page
- Dynamically loads all reports from database
- Search functionality
- Maintains your beautiful existing design
- Detailed report view with formatted content
- PDF download links (if provided)

## Security Notes

1. **Row Level Security (RLS)** is enabled on the reports table
2. Public users can **view** reports
3. Only **authenticated users** can create, edit, or delete reports
4. Store your admin credentials securely
5. Never commit credentials to your repository

## Troubleshooting

### Can't log in?
- Verify your user exists in Supabase Authentication
- Check that email/password are correct
- Ensure your Supabase URL and anon key are correctly set in `.env`

### Reports not showing?
- Check browser console for errors
- Verify Supabase connection in `.env` file
- Ensure RLS policies are correctly applied
- Try refreshing the page

### PDF upload fails?
- Verify storage bucket named `reports` exists
- Ensure bucket is set to public
- Check file size (keep under 50MB)
- Verify file is actually a PDF

## Next Steps

1. Create your admin account
2. Migrate existing reports (or create new ones)
3. Test the public reports page
4. Share the admin login with trusted team members as needed

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Supabase logs in the dashboard
3. Verify all environment variables are set correctly
4. Ensure database migrations ran successfully
