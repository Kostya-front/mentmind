import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { RegisterCommand } from "../commands/register.command";
import { GetUserByEmailQuery } from "../../user/queries/get-user-by-email.query";
import { HttpException, HttpStatus } from "@nestjs/common";
import { BcryptService } from "../../bcrypt/bcrypt.service";
import { CreateUserCommand } from "../../user/commands/create-user.command";
import { CreateMentorCommand } from "../../mentor/commands/create-mentor.command";
import { CreateStudentCommand } from "../../student/commands/create-student.command";
import { CreateAdminCommand } from "../../admin/commands/create-admin.command";

interface RoleCommandMap {
  [key: string]: typeof CreateUserCommand;
}

const roleCommandMap = {
  'mentor': CreateMentorCommand,
  'student': CreateStudentCommand,
  'admin': CreateAdminCommand
  // Добавьте другие роли, если необходимо
};

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand>{
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: RegisterCommand) {
    try {
      const candidate = await this.queryBus.execute(new GetUserByEmailQuery(command.register.email));

      if (candidate) {
        throw new Error('Пользователь с таким емайлом существует');
      }

      const hashPassword: string = await this.bcryptService.hash(command.register.password);

      const RoleCommand = roleCommandMap[command.register.role];

      const roleCommandInstance = new RoleCommand({...command.register, password: hashPassword});

      const user = await this.commandBus.execute(roleCommandInstance);

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }
}