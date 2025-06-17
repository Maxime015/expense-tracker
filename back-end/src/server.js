import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import helmet from 'helmet';
import compression from 'compression';

// Configuration Swagger
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load(join(__dirname, './swagger.yaml'));

import subscriptionsRoute from './routes/subscriptionsRoute.js';
import transactionsRoute from './routes/transactionsRoute.js';
import job from './config/cron.js';

dotenv.config();

const app = express();

// Sécurité de base
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === "production") {
  job.start();
}

// Middleware ordonné correctement
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      req.rawBody = buf.toString();
    } catch (e) {
      console.error('Body parsing error:', e);
    }
  }
}));

// Rate limiting EXCEPT pour la documentation
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) return next();
  rateLimiter(req, res, next);
});

// Gestion des erreurs améliorée
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      error: "Invalid JSON body",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  next(err);
});

const PORT = process.env.PORT || 5001;

// Health Check optimisé
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: "ok",
    message: "Expense Tracker API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Documentation Swagger avec options
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customSiteTitle: "Expense Tracker API Docs"
  })
);

// Routes API
app.use('/api/subscriptions', subscriptionsRoute);

app.use('/api/transactions', transactionsRoute);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler final
app.use((err, req, res, next) => {
  console.error('Final error handler:', err);
  res.status(500).json({ 
    error: "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`API docs: http://localhost:${PORT}/api-docs`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});