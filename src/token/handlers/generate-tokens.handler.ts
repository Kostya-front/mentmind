import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateTokensCommand } from "../commands/generate-tokens.command";
import { JwtService } from "@nestjs/jwt";

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler implements ICommandHandler<GenerateTokensCommand> {
  constructor(private readonly jwtService: JwtService) {}

  async execute(command: GenerateTokensCommand) {
    const accessToken = this.jwtService.sign(command.payload, {expiresIn: '1m', secret:'access'})
    const refreshToken = this.jwtService.sign(command.payload, {expiresIn: '24h', secret:'refresh'})

    return {
      accessToken,
      refreshToken,
      ...command.payload
    }
  }
}