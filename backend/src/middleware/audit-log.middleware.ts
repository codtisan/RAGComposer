import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ESIndexList } from 'src/config/db.config';
import { SearchService } from 'src/database/elasticsearch';
import { AuditLogDto } from 'src/dto/audit-log.dto';

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
  private logger = new Logger(AuditLogMiddleware.name);
  constructor(private readonly esService: SearchService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const auditLogData: AuditLogDto = {
      userId: '',
      deviceId: req.headers['user-agent'],
      ip: req.ip,
      route: req.originalUrl,
      method: req.method,
      timestamp: new Date(),
    };
    const loggingMessage = `${auditLogData.deviceId} - ${auditLogData.ip} - ${auditLogData.route} - ${auditLogData.method}`;
    await this.esService.insertDoc(ESIndexList.AUDIT_LOG, auditLogData);
    this.logger.log(loggingMessage);
    next();
  }
}
