import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteLessonCommand } from "../commands/delete-lesson.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Repository } from "typeorm";


@CommandHandler(DeleteLessonCommand)
export class DeleteLessonHandler implements ICommandHandler<DeleteLessonCommand> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}

  async execute(command: DeleteLessonCommand): Promise<any> {
    return this.lessonRepo.createQueryBuilder('lesson')
      .delete()
      .from(Lesson)
      .where('id = :id', {id: command.lessonId})
      .execute()
  }
}