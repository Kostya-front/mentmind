import { CommandBus, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RefreshTokensQuery } from "../queries/refresh=tokens.query";
import { JwtService } from "@nestjs/jwt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { GenerateTokensCommand } from "../../token/commands/generate-tokens.command";

@QueryHandler(RefreshTokensQuery)
export class RefreshTokensHandler implements IQueryHandler<RefreshTokensQuery> {
  constructor(
    private jwtService: JwtService,
    private commandBus: CommandBus
  ) {}

  async execute(query: RefreshTokensQuery) {
    try {
      const user = await this.jwtService.verify(query.refreshToken, {secret:'refresh'})
      return this.commandBus.execute(new GenerateTokensCommand({
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
      ))

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT)
    }
  }
}