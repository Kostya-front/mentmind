import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMentorCommand } from "../commands/create-mentor.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Mentor } from "../entities/mentor.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateMentorCommand)
export class CreateMentorHandler implements ICommandHandler<CreateMentorCommand> {
  constructor(@InjectRepository(Mentor) private readonly mentorRepo: Repository<Mentor>) {
  }

  async execute(command: CreateMentorCommand) {
    return this.mentorRepo.save({...command.mentor})
  }
}