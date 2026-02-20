import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Logger } from '../../../core/Logger';

// Middleware to audit log every request
const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  Logger.http(`${req.method} ${req.url} - ${req.ip}`);
  next();
};

const app: Express = express();

// Security & utility middleware
app.use(helmet());
app.use(cors());

// Enterprise Scale: Compression for payload size reduction
import compression from 'compression';
app.use(compression({ level: 6 }));

// Enterprise Scale: Unlimited payload sizes allowed (up to 50mb per request)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(auditLogger);

// API Routes
import { routes } from './routes';
import { systemRoutes } from './routes/system.routes'; // Added import for systemRoutes
app.use('/api/v1', routes);
app.use('/api/v1/system', systemRoutes); // Added systemRoutes mapping

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

export { app };
