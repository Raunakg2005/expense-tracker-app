# Expense Tracker Backend - Vercel Deployment

## Backend API for Expense Tracker App

This is the Express.js backend API configured to run as serverless functions on Vercel.

### Project Structure
```
server/
├── api/
│   └── index.js          # Serverless entry point
├── routes/               # API routes
├── models/               # Mongoose models
├── middleware/           # Auth & other middleware
├── utils/                # Helper utilities
├── index.js              # Express app configuration
├── package.json          # Backend dependencies
└── vercel.json           # Vercel deployment config
```

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

### Deployment to Vercel

#### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from the server directory:**
   ```bash
   cd server
   vercel --prod
   ```

#### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the **Root Directory** to `server`
4. Add environment variables (see below)
5. Click Deploy

### Environment Variables on Vercel

Add these in your Vercel project settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key-here` |
| `EMAIL_USER` | Email for OTP service | `your-email@gmail.com` |
| `EMAIL_PASS` | Email app password | `your-app-password` |

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (local development)
- `https://kharcha-tracker-ebon.vercel.app` (production frontend)

To add more origins, edit the CORS configuration in `server/index.js`.

### API Endpoints

Once deployed, your API will be available at:
```
https://your-backend-name.vercel.app/api/auth/...
https://your-backend-name.vercel.app/api/expenses/...
https://your-backend-name.vercel.app/api/budgets/...
https://your-backend-name.vercel.app/api/users/...
```

### Frontend Integration

Update your frontend `src/utils/api.js` to use the deployed backend URL:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-name.vercel.app';
```

Add this to your frontend `.env`:
```env
VITE_API_URL=https://your-backend-name.vercel.app
```

### Troubleshooting

**Cold Starts**: First request after inactivity may be slow (serverless limitation)

**MongoDB Connection**: Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for Vercel's dynamic IPs

**Environment Variables**: Double-check all env vars are set correctly in Vercel dashboard

**CORS Errors**: Verify your frontend URL is in the CORS allowed origins list

### Testing the Deployment

After deployment, test your endpoints:

```bash
# Health check (if you add one)
curl https://your-backend-name.vercel.app/api/auth/test

# Or use Postman to test your existing endpoints
```

### Notes

- This backend uses `serverless-http` to wrap the Express app for Vercel's serverless functions
- Database connections are created per request (MongoDB handles connection pooling automatically)
- Maximum execution time is 10 seconds on free tier (60 seconds on Pro)
