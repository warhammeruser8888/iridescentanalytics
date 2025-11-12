# Dynamic Report Management System

## Overview

Your quantitative finance platform now has a fully dynamic report management system! You can now upload, edit, and delete reports through a secure admin interface without ever needing to redeploy your application.

## What's New

### 1. Database Schema
- Created a `reports` table in Supabase with all necessary fields
- Configured Row Level Security (RLS):
  - Public users can **view** all reports
  - Authenticated admins can **create, edit, and delete** reports
- Set up indexes for optimal search performance

### 2. Authentication System
- Email/password authentication via Supabase Auth
- Login page with clean design matching your site aesthetic
- Protected routes for admin-only pages
- Session management with automatic token refresh

### 3. Admin Dashboard (`/admin`)
- View all reports in a sortable table
- Quick actions: Edit and Delete (with confirmation)
- Create new reports with one click
- Sign out functionality

### 4. Report Editor
**Rich Text Editor Features:**
- Bold and italic text
- Headings (H1, H2)
- Paragraphs
- Bullet lists and numbered lists
- Horizontal rules for section breaks
- All formatting preserved in database

**Metadata Fields:**
- Title, Type, Analyst, Date
- Recommendation (Long, Short, Research, Case Study)
- Current Price and Target Price (optional)
- Icon selection from predefined set
- Color theme selector
- Summary for card display
- Optional PDF file upload

### 5. Dynamic Reports Page
- Fetches all reports from Supabase database
- Real-time updates when new reports are added
- Search functionality across title, type, and analyst
- Maintains your beautiful existing design
- Safe HTML rendering with formatting preserved
- PDF download links when available

### 6. Storage
- Supabase Storage bucket for PDF files
- Public access for downloads
- Automatic URL generation

## Getting Started

### Step 1: Create Admin User

You need to create your first admin user in Supabase:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add User**
5. Enter your email and secure password
6. Click **Create User**

### Step 2: Set Up Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Name it: `reports`
4. Set it as **Public**
5. Click **Create bucket**

### Step 3: Migrate Existing Reports

You have two options:

#### Option A: Use the Migration Helper (Easiest)
1. Start your app: `npm run dev`
2. Navigate to: `http://localhost:5173`
3. In your browser URL, go to the migrate page by typing: `?page=migrate` or manually navigate
4. Click **Start Migration**
5. Wait for success confirmation

#### Option B: Manual Import
Use the admin interface to manually recreate each report with the rich text editor.

### Step 4: Log In and Start Managing

1. Navigate to your site
2. Add `/login` to access the login page (or navigate to it)
3. Sign in with your admin credentials
4. You'll be redirected to the admin dashboard

## How to Use

### Creating a New Report

1. From admin dashboard, click **New Report**
2. Fill in all required fields:
   - **Title**: Report name
   - **Type**: Category (e.g., "Long Recommendation")
   - **Analyst**: Your name
   - **Date**: Publication date
   - **Recommendation**: Long, Short, Research, or Case Study
   - **Icon**: Visual icon for the report card
   - **Color**: Theme color (red, green, blue, purple, orange)
   - **Summary**: Brief description for the card view
   - **Content**: Full report content using the rich text editor
3. Optional: Upload a PDF file for download
4. Optional: Add current price and target price for stock recommendations
5. Click **Create Report**

### Editing an Existing Report

1. From admin dashboard, find the report
2. Click the **Edit** icon (pencil)
3. Modify any fields
4. Click **Update Report**

### Deleting a Report

1. From admin dashboard, find the report
2. Click the **Delete** icon (trash)
3. Click **Confirm** to permanently delete

### Formatting Report Content

Use the rich text editor toolbar:
- **B** - Bold text
- **I** - Italic text
- **H1** - Large heading
- **H2** - Medium heading
- **P** - Paragraph
- **•** - Bullet list
- **1.** - Numbered list
- **—** - Horizontal line

The editor preserves all formatting when you save.

## File Structure

```
src/
├── lib/
│   └── supabase.ts              # Supabase client and types
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   ├── ProtectedRoute.tsx       # Route protection wrapper
│   └── RichTextEditor.tsx       # Rich text editor component
├── pages/
│   ├── Login.tsx                # Login page
│   ├── Admin.tsx                # Admin dashboard
│   ├── ReportForm.tsx           # Create/edit report form
│   ├── ReportsDynamic.tsx       # Dynamic reports page
│   └── MigrationHelper.tsx      # One-time migration tool
└── utils/
    └── migrateReports.ts        # Migration script

supabase/
└── migrations/
    └── create_reports_table.sql # Database schema
```

## Security

### Row Level Security (RLS)
All database operations are secured with RLS policies:
- **SELECT**: Anyone can view reports (public access)
- **INSERT**: Only authenticated users can create
- **UPDATE**: Only authenticated users can modify
- **DELETE**: Only authenticated users can delete

### Authentication
- Passwords are hashed and stored securely by Supabase
- Sessions use JWT tokens with automatic refresh
- Admin pages are protected and redirect to login if not authenticated

### Content Security
- HTML content is sanitized to prevent XSS attacks
- File uploads are validated for type and size
- All API calls use secure HTTPS connections

## URLs and Navigation

| Page | URL | Access |
|------|-----|--------|
| Home | `/` | Public |
| Reports | `/reports` | Public |
| Login | `/login` | Public |
| Admin Dashboard | `/admin` | Protected |
| Create Report | `/admin-create` | Protected |
| Edit Report | `/admin-edit-{id}` | Protected |
| Migration | `/migrate` | Public (one-time use) |

## Troubleshooting

### "Can't log in"
- Verify user exists in Supabase Auth
- Check email and password are correct
- Ensure `.env` has correct Supabase credentials

### "Reports not loading"
- Check browser console for errors
- Verify Supabase connection
- Confirm RLS policies are active
- Try hard refresh (Ctrl+Shift+R)

### "PDF upload fails"
- Verify storage bucket exists and is named `reports`
- Ensure bucket is set to public
- Check file is actually a PDF
- Verify file size is reasonable (< 50MB)

### "Rich text editor not working"
- Try a different browser
- Clear browser cache
- Check for JavaScript errors in console

## Technical Details

### Database Schema
```sql
reports (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  type text NOT NULL,
  date text NOT NULL,
  analyst text NOT NULL,
  recommendation text NOT NULL,
  target_price text,
  current_price text,
  icon_name text NOT NULL,
  color text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  pdf_url text,
  created_at timestamptz,
  updated_at timestamptz
)
```

### Rich Text Storage
Content is stored as HTML in the database, allowing:
- Semantic markup (h1, h2, p, ul, ol, hr)
- Text formatting (bold, italic)
- Safe rendering with React's `dangerouslySetInnerHTML`
- Full control over presentation

### Icon System
Reports use Lucide React icons:
- TrendingUp (green, for long positions)
- TrendingDown (red, for short positions)
- BarChart3 (blue, for research)
- Building2 (purple, for case studies)
- FileText (default)
- DollarSign (financial)

## Benefits

1. **No Redeployment**: Add unlimited reports without code changes
2. **Full Formatting Control**: Rich text editor for professional content
3. **Secure**: Admin-only access with authentication
4. **Fast**: Direct database queries with indexes
5. **Scalable**: Handles unlimited reports efficiently
6. **Beautiful**: Maintains your existing design aesthetic
7. **Searchable**: Built-in search across all fields
8. **Flexible**: Edit and delete as needed

## Next Steps

1. Create your admin account in Supabase
2. Set up the storage bucket
3. Run the migration to import existing reports
4. Log in and explore the admin dashboard
5. Create your first new report
6. Share the admin login with team members as needed

Enjoy your new dynamic report management system!
