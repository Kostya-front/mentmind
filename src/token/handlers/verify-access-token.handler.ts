import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { VerifyAccessTokenQuery } from "../queries/verify-access-token.query";
import { JwtService } from "@nestjs/jwt";
import { HttpException, HttpStatus } from "@nestjs/common";


@QueryHandler(VerifyAccessTokenQuery)
export class VerifyAccessTokenHandler implements IQueryHandler<VerifyAccessTokenQuery> {
  constructor(private readonly jwtService: JwtService) {}

  async execute(query: VerifyAccessTokenQuery) {
    try {
      return this.jwtService.verify(query.accessToken, {secret: 'access'})
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED)
    }
  }
}