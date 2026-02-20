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
app.use(express.json());
app.use(auditLogger);

// API Routes
import { routes } from './routes';
app.use('/api/v1', routes);

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
