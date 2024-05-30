import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRequestCommand } from "../commands/update-request.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "../entities/request.entity";

@CommandHandler(UpdateRequestCommand)
export class UpdateRequestHandler implements ICommandHandler<UpdateRequestCommand> {
  constructor(@InjectRepository(Request) private readonly requestRepo: Repository<Request>) {}

  async execute(command: UpdateRequestCommand) {
    return this.requestRepo.createQueryBuilder('request')
      .update(Request)
      .set({
        admin: {id: command.updatedRequest.adminId},
        isSelected: command.updatedRequest.isSelected,
        isCompleted: command.updatedRequest.isCompleted
      })
      .where('id = :id', {id: command.updatedRequest.id})
      .execute()
  }
}