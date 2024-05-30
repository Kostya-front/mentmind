import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import express, { NextFunction } from "express";
import { CheckAuthQuery } from "../auth/queries/check-auth.query";
import { VerifyAccessTokenQuery } from "../token/queries/verify-access-token.query";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly queryBus: QueryBus) {}

  async use(req: express.Request, res: Response, next: NextFunction) {
    // Проводим аутентификацию пользователя
    try {
      const header = req.headers?.authorization
      const token = header?.split(' ')[1]
      if (token) {

        const userData = await this.queryBus.execute(new VerifyAccessTokenQuery(token))
        if (userData) {
          //@ts-ignore
          req.user = userData; // Добавляем пользователя в объект request
          console.log(userData)
          return next();
        }
      }
    } catch {
      throw new HttpException('no', 401)
    }
  }
}