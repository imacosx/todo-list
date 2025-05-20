import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

  

    if (!authHeader) {
      throw new ForbiddenException('token no encontrado');
    }

    if (err || !user) {
      throw err || new ForbiddenException('token no valido o expirado');
    }



    return user;
  }
}
