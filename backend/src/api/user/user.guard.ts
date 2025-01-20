import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import serverConfig from 'src/config/server.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const userToken = authHeader.split('Bearer ')[1];
    if (!userToken) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(userToken, { secret: serverConfig().jwtSecret });
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
