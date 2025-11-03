import serverless from 'serverless-http';
import app from '../server/index.js';

// Wrap the Express app with serverless-http for Vercel
export default serverless(app);
