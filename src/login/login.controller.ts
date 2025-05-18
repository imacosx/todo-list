import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { RequestLoginDto } from './dto/requestLogin.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService){}
    
    @Post('login-user')
    async login(@Body() loginDto: RequestLoginDto){
       return await this.loginService.loginUser(loginDto);
    }
}
