import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestLoginDto } from './dto/requestLogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async loginUser(requestLogin: RequestLoginDto) {
    try {
      const { email, password } = requestLogin;

      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user?.password))) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      if (!user?.isActive) {
        throw new ForbiddenException('El usuario no está activo');
      }

      const token = await this.authService.generateJwt(user);
      const nameUser = user?.name + ' ' + user?.lastname;

      return {
        status: 200,
        data: {
            username: nameUser,
            token,
        }
      };
    } catch (error) {
        console.log("error", error)
    }
  }
}
