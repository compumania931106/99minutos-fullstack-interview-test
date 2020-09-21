import { Controller, Body, Post, Get, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async checkJWT(@Res() res) {
        res.status(HttpStatus.OK).json({ message: 'JWT valid' });
    }

    @Post('/')
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.validateUser(loginDTO);
    }
}
