# 🎯 Final Setup - Connect Frontend to Backend

## ✅ What's Configured

### Backend Deployed:
- URL: `https://expense-tracker-app-backend-blush.vercel.app`
- Status: ✅ Deployed on Vercel

### Frontend Deployed:
- URL: `https://kharcha-tracker-ebon.vercel.app`
- Status: ✅ Deployed on Vercel

## 🔧 Critical Steps to Complete

### 1. Add Environment Variables to Backend (Vercel)

Go to your backend Vercel project: https://vercel.com/dashboard

**Settings → Environment Variables → Add these:**

| Name | Value | Notes |
|------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://agarwaln_db_user:qKj2CtPqoh9tuDe6@cluster0.cign1ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` | Your MongoDB connection |
| `JWT_SECRET` | `qwertyuioplkjhgfdsazxcvbnml` | For JWT token signing |
| `EMAIL_USER` | Your Gmail address | For OTP emails |
| `EMAIL_PASSWORD` | Your Gmail App Password | Not regular password! |
| `NODE_ENV` | `production` | Set to production |

**⚠️ IMPORTANT:** After adding these, you MUST **Redeploy** the backend:
- Go to **Deployments** tab
- Click the three dots (...) on latest deployment
- Click **"Redeploy"**

### 2. Add Environment Variables to Frontend (Vercel)

Go to your frontend Vercel project: https://vercel.com/dashboard

**Settings → Environment Variables → Add this:**

| Name | Value |
|------|-------|
| `VITE_API_BASE_URL` | `https://expense-tracker-app-backend-blush.vercel.app/api` |

**⚠️ IMPORTANT:** After adding this, **Redeploy** the frontend:
- Go to **Deployments** tab
- Click the three dots (...) on latest deployment
- Click **"Redeploy"**

### 3. MongoDB Atlas - Allow Vercel IPs

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click **Network Access** (left sidebar)
3. Click **"+ ADD IP ADDRESS"**
4. Click **"ALLOW ACCESS FROM ANYWHERE"**
5. Enter `0.0.0.0/0` in the IP Address field
6. Add description: "Vercel Serverless Functions"
7. Click **"Confirm"**

### 4. Gmail App Password (for OTP emails)

If you haven't already:

1. Go to your Google Account: https://myaccount.google.com
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not enabled)
4. Go to **App Passwords**
5. Generate a new app password for "Mail"
6. Copy the 16-character password
7. Add it to your backend Vercel env vars as `EMAIL_PASSWORD`

## 🧪 Testing Your Deployment

### Test Backend API:

```powershell
# Test if backend is responding (from PowerShell)
curl https://expense-tracker-app-backend-blush.vercel.app/api/expenses -Headers @{"Authorization"="Bearer test"}
```

Or use Postman:
- POST: `https://expense-tracker-app-backend-blush.vercel.app/api/auth/signup`
- Body: JSON with user details

### Test Frontend:

1. Open: https://kharcha-tracker-ebon.vercel.app
2. Try to sign up with a new account
3. Check if OTP email arrives
4. Log in and test expenses/budgets

## 📝 Deployment Checklist

- [ ] Backend deployed to Vercel ✅
- [ ] Frontend deployed to Vercel ✅
- [ ] Backend env vars added (MONGODB_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASSWORD)
- [ ] Backend redeployed after adding env vars
- [ ] Frontend env var added (VITE_API_BASE_URL)
- [ ] Frontend redeployed after adding env var
- [ ] MongoDB Atlas allows connections from 0.0.0.0/0
- [ ] Gmail App Password generated and added
- [ ] Tested signup on frontend
- [ ] Tested login on frontend
- [ ] Tested creating expenses
- [ ] Tested creating budgets

## 🔄 Redeploy Commands (if needed)

### Redeploy Frontend:
```powershell
cd D:\E\dallekaprject\oot\expense-tracker-app\expense-tracker-app
vercel --prod
```

### Redeploy Backend:
```powershell
cd D:\E\dallekaprject\oot\expense-tracker-app\expense-tracker-app\server
vercel --prod
```

## 🐛 Troubleshooting

### "Network Error" on Frontend
- Check: Did you add `VITE_API_BASE_URL` to frontend Vercel env vars?
- Check: Did you redeploy frontend after adding env var?
- Check: Open browser console (F12) to see actual error

### "MongoDB Connection Error" 
- Check: Did you add `MONGODB_URI` to backend Vercel env vars?
- Check: Did you allow 0.0.0.0/0 in MongoDB Atlas Network Access?
- Check: Did you redeploy backend after adding env vars?

### "JWT Error" / Auth not working
- Check: Did you add `JWT_SECRET` to backend Vercel env vars?
- Check: Did you redeploy backend after adding env vars?

### "OTP Email not received"
- Check: Did you add `EMAIL_USER` and `EMAIL_PASSWORD` to backend?
- Check: Is `EMAIL_PASSWORD` the App Password (16 chars), not your regular password?
- Check: Spam folder in email

### CORS Error
- The backend is already configured for your frontend URL
- If you changed frontend URL, update `server/index.js` CORS settings

## 🚀 You're Live!

Once all checklist items are complete:

- **Frontend**: https://kharcha-tracker-ebon.vercel.app
- **Backend**: https://expense-tracker-app-backend-blush.vercel.app

Both will auto-deploy on every push to `main` branch! 🎉

## 📱 Next Features to Add

Consider adding:
- Password reset via email
- Email verification on signup
- User profile picture upload
- Export expenses to CSV
- Budget alerts via email
- Dashboard charts and analytics
- Mobile responsive improvements
- PWA (Progressive Web App) support
