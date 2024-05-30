import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateMentor } from "../commands/update-mentor";
import { InjectRepository } from "@nestjs/typeorm";
import { Mentor } from "../entities/mentor.entity";
import { Repository } from "typeorm";


@CommandHandler(UpdateMentor)
export class UpdateMentorHandler implements ICommandHandler<UpdateMentor> {
  constructor(@InjectRepository(Mentor) private readonly mentorRepo: Repository<Mentor>) {}

  async execute(command: UpdateMentor): Promise<any> {
    return this.mentorRepo.createQueryBuilder('mentor')
      .update(Mentor)
      .set(command.updateMentor)
      .where('id = :id', {id: command.id})
      .execute()
  }
}