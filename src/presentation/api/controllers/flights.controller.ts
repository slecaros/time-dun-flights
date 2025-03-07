import { Request, Response } from 'express';
import { Controller } from '@domain/interfaces/controller.interface';

export class FlightsController implements Controller {
  public execute(req: Request, res: Response): void {
    res.status(200).json({
      status: 'success',
      message: 'Flights endpoint is working',
      data: [],
      timestamp: new Date().toISOString(),
    });
  }
} 