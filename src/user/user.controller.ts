import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {

    @UseGuards(JwtAuthGuard)
    @Get('all-users')
    async getAllUsers(){
        return "todos los usuarios"
    }
}
