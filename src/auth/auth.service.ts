import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from "../users/user.entity";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){}

    validateUser(email: string) {
        const user = this.usersService.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }


    generateTokens(user: User) {
        // TODO: create jwt
        const payload = { sub: user.id, email: user.email };

        return { access_token: this.jwtService.sign(payload)};
    }
}
