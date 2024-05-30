import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { LoginCommand } from "../commands/login.command";
import { GetUserByEmailQuery } from "../../user/queries/get-user-by-email.query";
import { HttpException, HttpStatus } from "@nestjs/common";
import { BcryptService } from "../../bcrypt/bcrypt.service";
import { GenerateTokensCommand } from "../../token/commands/generate-tokens.command";


@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: LoginCommand) {
    const candidate = await this.queryBus.execute(new GetUserByEmailQuery(command.login.email))

    if(!candidate) {
      throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND)
    }

    const isCompare = await this.bcryptService.compare(command.login.password, candidate.password)

    if(!isCompare) {
      throw new HttpException('Неправильный пароль', HttpStatus.CONFLICT)
    }

    const tokenData = await this.commandBus.execute(new GenerateTokensCommand({
      id: candidate.id,
      email: candidate.email,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      role: candidate.role
    }
    ))

    return tokenData
  }
}