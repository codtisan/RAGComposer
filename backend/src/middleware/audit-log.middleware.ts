import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditLogDto } from 'src/dto/audit-log.dto';

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
  private logger = new Logger(AuditLogMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const auditLogData: AuditLogDto = {
      userId: '',
      deviceId: req.headers['user-agent'],
      ip: req.ip,
      route: req.originalUrl,
      method: req.method,
      timestamp: new Date(),
    };
    this.logger.log('Audit Log Middleware:', auditLogData);
    next();
  }
}
