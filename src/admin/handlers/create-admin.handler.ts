import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAdminCommand } from "../commands/create-admin.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "../entities/admin.entity";
import { Repository } from "typeorm";


@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(@InjectRepository(Admin) private readonly repo: Repository<Admin>) {}

  async execute(command: CreateAdminCommand): Promise<Admin> {
    return this.repo.save({ ...command.admin })
  }
}