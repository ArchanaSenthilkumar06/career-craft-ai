import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './server/src/config/db';
import { apiRouter } from './server/src/routes/api';
import resumeRouter from './server/src/routes/resumeRoutes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Initialize database connection
  await connectDB();

  // API Routes
  app.use('/api/v1', apiRouter);
  app.use('/api/v1/resumes', resumeRouter);

  // Development vs Production serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareercraftAI server listening at http://0.0.0.0:${PORT}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down CareercraftAI server...');
    await disconnectDB();
    server.close(() => {
      console.log('Server terminated.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer().catch((err) => {
  console.error('Failed to start CareercraftAI server:', err);
  process.exit(1);
});
