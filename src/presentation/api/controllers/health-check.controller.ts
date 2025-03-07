import { Request, Response } from 'express';
import { Controller } from '@domain/interfaces/controller.interface';

export class HealthCheckController implements Controller {
  public execute(req: Request, res: Response): void {
    console.log('Im a health check controller')
    res.status(200).json({
      status: 'success',
      message: 'API is running',
      timestamp: new Date().toISOString(),
    });
  }
} 