import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
    ) {}

    async validateUser(loginDTO: LoginDTO) {
        // This will be used for the initial login
        return new Promise((resolve, reject) => {
            if (loginDTO.username !== process.env.APP_USERNAME.toString()) {
                reject(new UnauthorizedException('Username not found'));
            }

            if (loginDTO.password !== process.env.APP_PASSWORD.toString()) {
                reject(new UnauthorizedException('credentials not valid'));
            }

            resolve(this.createJwtPayload(loginDTO));
        })
    }

    async validateUserByJwt(payload: JwtPayload) {

        // This will be used when the user has already logged in and has a JWT
        let user: LoginDTO;

        if (payload.username === process.env.APP_USERNAME.toString()) {
            user = payload;
        }

        if (user.username) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(credentails: LoginDTO) {

        const data: JwtPayload = {
            username: credentails.username,
        };

        const jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt,
        };

    }

}
