# Quick Start Guide - Report Management System

## 🚀 Get Started in 5 Minutes

### 1. Create Your Admin Account (2 minutes)

1. Go to: https://supabase.com/dashboard
2. Select your project: `yzdfuvjnoexnwqtyfrje`
3. Click **Authentication** → **Users** → **Add User**
4. Enter:
   - Email: `your-email@example.com`
   - Password: `your-secure-password`
5. Click **Create User**

### 2. Set Up Storage (1 minute)

1. In Supabase, click **Storage**
2. Click **Create a new bucket**
3. Name: `reports`
4. Toggle: **Public bucket** (ON)
5. Click **Create**

### 3. Start Your App (30 seconds)

```bash
npm run dev
```

Visit: http://localhost:5173

### 4. Migrate Reports (1 minute)

**Option A - Automatic (Recommended):**
1. In browser, navigate by changing URL or state to: `migrate` page
2. Click **Start Migration**
3. Wait for success message

**Option B - Manual:**
1. Navigate to `/login`
2. Sign in with your admin credentials
3. Go to admin dashboard
4. Create reports one by one using the form

### 5. Start Managing Reports (30 seconds)

1. Navigate to `/login` (or add login button to your nav)
2. Sign in
3. Click **New Report** to create your first custom report!

---

## 📝 Quick Reference

### Admin Actions
- **Create**: Admin Dashboard → New Report
- **Edit**: Admin Dashboard → Click pencil icon
- **Delete**: Admin Dashboard → Click trash icon → Confirm

### Rich Text Formatting
- **Bold**: Select text → Click **B**
- **Italic**: Select text → Click **I**
- **Heading**: Click **H1** or **H2**
- **List**: Click bullet or number icon

### Report Fields
- ✅ Required: Title, Type, Analyst, Date, Recommendation, Summary, Content
- ⭕ Optional: Current Price, Target Price, PDF File

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| Login | `/login` |
| Admin | `/admin` |
| Reports | `/reports` |
| Migrate | `/migrate` |

---

## 🆘 Common Issues

**Can't login?**
→ Double-check user exists in Supabase Auth

**Reports not showing?**
→ Run migration first, then refresh

**PDF upload fails?**
→ Ensure storage bucket named `reports` exists and is public

---

## ✨ What You Can Do Now

✅ Upload unlimited reports without redeploying
✅ Format content with headings, lists, bold, italic
✅ Edit and delete existing reports anytime
✅ Upload PDF files for download
✅ Search across all reports
✅ Full admin control with authentication

**That's it! You're ready to go.** 🎉

For detailed information, see `REPORT_SYSTEM_README.md`
