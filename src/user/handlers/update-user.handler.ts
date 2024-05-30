import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../commands/update-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository, UpdateResult } from "typeorm";


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async execute(command: UpdateUserCommand): Promise<UpdateResult> {
    return this.repo.createQueryBuilder('user')
      .update(User)
      .set(command.updateUser)
      .where('id = :id', {id: command.id})
      .execute()
  }
}