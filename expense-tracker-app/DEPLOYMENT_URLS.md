# 🔗 Deployment URLs & Quick Reference

## Your Deployed Applications

### Frontend (Production)
```
https://kharcha-tracker-ebon.vercel.app
```

### Backend API (Production)
```
https://expense-tracker-app-backend-blush.vercel.app
```

## API Endpoints

All backend endpoints are prefixed with `/api`:

### Auth Endpoints
```
POST https://expense-tracker-app-backend-blush.vercel.app/api/auth/signup
POST https://expense-tracker-app-backend-blush.vercel.app/api/auth/login
POST https://expense-tracker-app-backend-blush.vercel.app/api/auth/verify-otp
POST https://expense-tracker-app-backend-blush.vercel.app/api/auth/logout
```

### Expense Endpoints
```
GET    https://expense-tracker-app-backend-blush.vercel.app/api/expenses
POST   https://expense-tracker-app-backend-blush.vercel.app/api/expenses
PUT    https://expense-tracker-app-backend-blush.vercel.app/api/expenses/:id
DELETE https://expense-tracker-app-backend-blush.vercel.app/api/expenses/:id
```

### Budget Endpoints
```
GET    https://expense-tracker-app-backend-blush.vercel.app/api/budgets
POST   https://expense-tracker-app-backend-blush.vercel.app/api/budgets
PUT    https://expense-tracker-app-backend-blush.vercel.app/api/budgets/:id
DELETE https://expense-tracker-app-backend-blush.vercel.app/api/budgets/:id
```

### User Endpoints
```
GET    https://expense-tracker-app-backend-blush.vercel.app/api/users/profile
PUT    https://expense-tracker-app-backend-blush.vercel.app/api/users/profile
```

## Environment Variables Required

### Backend (Vercel Dashboard)
```
MONGODB_URI=mongodb+srv://agarwaln_db_user:qKj2CtPqoh9tuDe6@cluster0.cign1ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=qwertyuioplkjhgfdsazxcvbnml
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
NODE_ENV=production
```

### Frontend (Vercel Dashboard)
```
VITE_API_BASE_URL=https://expense-tracker-app-backend-blush.vercel.app/api
```

## Quick Commands

### Redeploy Frontend
```powershell
cd D:\E\dallekaprject\oot\expense-tracker-app\expense-tracker-app
vercel --prod
```

### Redeploy Backend
```powershell
cd D:\E\dallekaprject\oot\expense-tracker-app\expense-tracker-app\server
vercel --prod
```

### Test Backend (PowerShell)
```powershell
# Test endpoint (replace with actual endpoint)
Invoke-RestMethod -Uri "https://expense-tracker-app-backend-blush.vercel.app/api/expenses" -Headers @{Authorization="Bearer your-token"}
```

### View Logs (Vercel CLI)
```powershell
# Frontend logs
vercel logs https://kharcha-tracker-ebon.vercel.app

# Backend logs
vercel logs https://expense-tracker-app-backend-blush.vercel.app
```

## Important Links

- **Frontend Vercel Dashboard**: https://vercel.com/dashboard (select: kharcha-tracker-ebon)
- **Backend Vercel Dashboard**: https://vercel.com/dashboard (select: expense-tracker-app-backend)
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Google Account (App Passwords)**: https://myaccount.google.com/security

## Git Commands (for updates)

```powershell
# After making code changes
git add .
git commit -m "Your commit message"
git push origin main

# Vercel will auto-deploy!
```

## Testing Checklist

- [ ] Frontend loads: https://kharcha-tracker-ebon.vercel.app ✓
- [ ] Can sign up new user
- [ ] Receive OTP email
- [ ] Can log in
- [ ] Can create expense
- [ ] Can create budget
- [ ] Can view dashboard
- [ ] Can edit profile

## Support

If you encounter issues:
1. Check browser console (F12 → Console tab)
2. Check Vercel deployment logs
3. Check MongoDB Atlas connection status
4. Verify all environment variables are set
5. Try redeploying both frontend and backend

---

**Last Updated**: November 3, 2025
**Status**: ✅ Production Ready
