// Vercel Serverless Function
import express from 'express';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/vite';

// Create a new Express instance for Vercel deployment
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
(async () => {
  await registerRoutes(app);
  
  // Use static files in production
  serveStatic(app);
  
  // Don't actually start the server - Vercel will handle that
  console.log('API handler initialized for Vercel');
})();

// Export the Express app as a Vercel serverless function
export default app;