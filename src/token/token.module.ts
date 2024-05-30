import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { GenerateTokensHandler } from "./handlers/generate-tokens.handler";
import { JwtService } from "@nestjs/jwt";
import { VerifyAccessTokenHandler } from "./handlers/verify-access-token.handler";

const handlers = [
  GenerateTokensHandler,
  VerifyAccessTokenHandler
]
@Module({
  controllers: [TokenController],
  providers: [TokenService, JwtService, ...handlers],
  exports: [TokenModule]
})
export class TokenModule {}
