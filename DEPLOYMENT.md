# Deployment Guide - Stock Prediction Application

This guide provides comprehensive instructions for deploying the stock prediction application with the LSTM backend to Hostinger.

## Architecture Overview

The application consists of two main parts:
1. **Frontend**: React/TypeScript application (Vite)
2. **Backend**: Python FastAPI server with LSTM model

Both can be deployed separately to Hostinger.

## Prerequisites

- Hostinger hosting account with SSH access
- Node.js and npm installed locally
- Python 3.8+ available on Hostinger
- Supabase account and project configured
- Domain or subdomain for the API (e.g., api.yourdomain.com)

## Part 1: Backend Deployment

### 1.1 Local Preparation

Before deploying, test the backend locally:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```

Verify it works by visiting `http://localhost:8000/health`

### 1.2 Supabase Configuration

Ensure your Supabase project has:
- The database tables created (from migration)
- Service role key available in project settings
- Correct RLS policies enabled

### 1.3 Upload Backend to Hostinger

**Option A: Using Git (Recommended)**
```bash
# On Hostinger server
cd ~
git clone your-repository-url
cd project/backend
```

**Option B: Using FTP/SFTP**
1. Connect via FileZilla or similar FTP client
2. Upload the entire `backend` folder to `/home/username/backend`

**Option C: Using rsync (if SSH available)**
```bash
rsync -avz --exclude 'venv' --exclude 'models' --exclude '__pycache__' \
  ./backend/ user@your-server:/home/username/backend/
```

### 1.4 Server Setup

SSH into your Hostinger server:

```bash
ssh username@your-server
```

Navigate to backend directory:
```bash
cd ~/backend
```

Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

### 1.5 Configure Environment

Create `.env` file:
```bash
nano .env
```

Add your configuration:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

MODEL_CACHE_DIR=./models
MODEL_CACHE_DAYS=7

API_HOST=0.0.0.0
API_PORT=8000

CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Important:** Update `CORS_ORIGINS` with your actual frontend domain(s).

### 1.6 Test the Backend

Run a quick test:
```bash
python main.py
```

If successful, stop it (Ctrl+C) and proceed to set up the process manager.

### 1.7 Set Up Process Manager

**Using Supervisor (Recommended for Hostinger):**

Install supervisor if not available:
```bash
sudo apt-get install supervisor
```

Create supervisor config:
```bash
sudo nano /etc/supervisor/conf.d/stock-prediction.conf
```

Add configuration:
```ini
[program:stock-prediction]
directory=/home/username/backend
command=/home/username/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
user=username
autostart=true
autorestart=true
stderr_logfile=/var/log/stock-prediction.err.log
stdout_logfile=/var/log/stock-prediction.out.log
```

Start the service:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start stock-prediction
sudo supervisorctl status stock-prediction
```

**Alternative: Using screen (simpler but not permanent)**

```bash
screen -S stock-api
source venv/bin/activate
python main.py
# Press Ctrl+A then D to detach
```

To reattach: `screen -r stock-api`

### 1.8 Configure Nginx/Apache Reverse Proxy

**For Nginx:**

Create or edit site configuration:
```bash
sudo nano /etc/nginx/sites-available/api.yourdomain.com
```

Add:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/api.yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**For Apache:**

Enable proxy modules:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
```

Create virtual host:
```apache
<VirtualHost *:80>
    ServerName api.yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/
</VirtualHost>
```

### 1.9 Set Up SSL (HTTPS)

Use Let's Encrypt for free SSL:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

Follow the prompts to complete SSL setup.

### 1.10 Verify Backend Deployment

Test your API:
```bash
curl https://api.yourdomain.com/health
```

Should return:
```json
{"status":"healthy","message":"Service is operational"}
```

## Part 2: Frontend Deployment

### 2.1 Configure Frontend Environment

Update `.env` in your project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_API_URL=https://api.yourdomain.com
```

### 2.2 Build Frontend

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### 2.3 Deploy Frontend to Hostinger

**Option A: Manual Upload**
1. Upload contents of `dist` folder to your public_html directory via FTP
2. Ensure `.htaccess` is configured for SPA routing

**Option B: Using rsync**
```bash
rsync -avz dist/ user@your-server:/home/username/public_html/
```

### 2.4 Configure SPA Routing

Create `.htaccess` in your public_html:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2.5 Verify Frontend Deployment

Visit your domain and test:
1. Navigate to Stock Prediction page
2. Enter a ticker (e.g., AAPL)
3. Click Predict
4. Verify results appear

## Part 3: Continuous Deployment (Optional)

### 3.1 Set Up Git Deployment

Create a deployment script on server:
```bash
nano ~/deploy.sh
```

Add:
```bash
#!/bin/bash
cd ~/backend
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
sudo supervisorctl restart stock-prediction
echo "Backend deployed successfully!"
```

Make executable:
```bash
chmod +x ~/deploy.sh
```

### 3.2 Frontend Auto-Deploy

Create frontend deploy script:
```bash
nano ~/deploy-frontend.sh
```

Add:
```bash
#!/bin/bash
cd ~/project
git pull origin main
npm install
npm run build
rsync -av --delete dist/ ~/public_html/
echo "Frontend deployed successfully!"
```

## Monitoring and Maintenance

### Check Backend Logs
```bash
# Supervisor logs
sudo tail -f /var/log/stock-prediction.out.log
sudo tail -f /var/log/stock-prediction.err.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Backend
sudo supervisorctl restart stock-prediction

# Nginx
sudo systemctl restart nginx
```

### Update Models
Models are automatically cached for 7 days. To clear cache:
```bash
cd ~/backend
rm -rf models/*.pth models/*.pkl
```

### Database Maintenance
Monitor Supabase dashboard for:
- Storage usage
- API requests
- Database performance

## Performance Optimization

### Backend
1. Enable model caching (already configured)
2. Use connection pooling for database
3. Implement request rate limiting
4. Consider using Redis for caching

### Frontend
1. Enable CDN for static assets
2. Configure browser caching headers
3. Optimize images and assets
4. Use compression (gzip/brotli)

## Troubleshooting

### Backend Not Starting
```bash
# Check if port 8000 is available
sudo netstat -tulpn | grep 8000

# Check Python version
python3 --version

# Verify virtual environment
which python
```

### CORS Errors
- Verify CORS_ORIGINS in backend `.env`
- Check Nginx/Apache proxy headers
- Ensure frontend uses correct API URL

### Model Training Timeout
- Increase timeout in prediction service
- Reduce number of epochs
- Use smaller batch size

### Database Connection Issues
- Verify Supabase credentials
- Check network connectivity
- Ensure RLS policies are correct

## Security Checklist

- [ ] Environment variables secured (not in git)
- [ ] SSL/HTTPS enabled for both frontend and backend
- [ ] CORS properly configured
- [ ] Supabase service role key only on backend
- [ ] Regular security updates applied
- [ ] Firewall configured
- [ ] Rate limiting implemented
- [ ] Logs monitored regularly

## Backup Strategy

### Backend Code
- Use Git for version control
- Regular commits and pushes

### Models
```bash
# Create backup directory
mkdir -p ~/backups/models

# Backup models weekly
0 0 * * 0 tar -czf ~/backups/models/models-$(date +\%Y\%m\%d).tar.gz ~/backend/models/
```

### Database
- Use Supabase's built-in backups
- Export data regularly via Supabase dashboard

## Support Resources

- **Hostinger Support**: https://www.hostinger.com/tutorials
- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **Supabase Documentation**: https://supabase.com/docs
- **PyTorch Documentation**: https://pytorch.org/docs/

## Post-Deployment Testing

After deployment, test these scenarios:

1. **Health Check**: `curl https://api.yourdomain.com/health`
2. **Stock Prediction**: Test with AAPL, TSLA, MSFT
3. **Model Caching**: Second request should be faster
4. **Error Handling**: Test with invalid ticker
5. **Frontend Integration**: All charts and metrics display correctly
6. **Mobile Responsiveness**: Test on mobile devices
7. **Performance**: Check page load times
8. **HTTPS**: Verify SSL certificate is valid

## Rollback Plan

If deployment fails:

1. **Backend Rollback**:
   ```bash
   cd ~/backend
   git checkout previous-working-commit
   sudo supervisorctl restart stock-prediction
   ```

2. **Frontend Rollback**:
   ```bash
   # Restore from backup
   cp -r ~/backups/dist-backup/* ~/public_html/
   ```

## Conclusion

Your LSTM stock prediction application should now be fully deployed and operational on Hostinger. Monitor the logs regularly and keep dependencies updated for optimal performance and security.
