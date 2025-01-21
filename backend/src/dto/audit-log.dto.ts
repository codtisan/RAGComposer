export class AuditLogDto {
  userId: string;
  deviceId: string;
  ip: string;
  route: string;
  method: string;
  timestamp: Date;
}
