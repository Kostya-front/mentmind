import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from "../bcrypt/bcrypt.service";
import { CqrsModule } from "@nestjs/cqrs";
import { UserModule } from "../user/user.module";
import { RegisterHandler } from "./handlers/register.handler";
import { LoginHandler } from "./handlers/login.handler";
import { TokenModule } from "../token/token.module";
import { VerifyAccessTokenHandler } from "../token/handlers/verify-access-token.handler";
import { JwtService } from "@nestjs/jwt";
import { CheckAuthHandler } from "./handlers/check-auth.handler";
import { RefreshTokensHandler } from "./handlers/refresh-tokens.handler";
import { AdminModule } from "../admin/admin.module";

const handlers = [
  RegisterHandler,
  LoginHandler,
  VerifyAccessTokenHandler,
  CheckAuthHandler,
  RefreshTokensHandler
]
@Module({
  imports: [CqrsModule, UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JwtService, ...handlers],
})
export class AuthModule {}
// fetch('http://localhost:3000/auth/login', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({email:'admin@mail.ru', password: 'qwerty'})
// }).then(resp => resp.json()).then(data => console.log(data))