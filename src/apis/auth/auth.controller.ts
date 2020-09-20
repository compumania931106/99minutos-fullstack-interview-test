import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/')
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.validateUser(loginDTO);
    }
}
