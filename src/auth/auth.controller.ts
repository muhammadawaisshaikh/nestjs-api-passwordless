import { Controller, Req, Res, Post, Get, Body, ValidationPipe, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { PasswordLessLoginDto } from './passwordless-login.dto';
import {AuthGuard } from '@nestjs/passport'


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MagicLoginStrategy,
    ) {}

  @Post('login')
  login(@Req() req, @Res() res, @Body(new ValidationPipe()) body: PasswordLessLoginDto) {
    this.authService.validateUser(body.destination);

    return this.strategy.send(req,res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req){
    // return req.user;
    return this.authService.generateTokens(req.user);
  }

}
