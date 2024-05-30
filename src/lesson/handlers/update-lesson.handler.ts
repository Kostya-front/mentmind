import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateLessonCommand } from "../commands/update-lesson.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Repository, UpdateResult } from "typeorm";


@CommandHandler(UpdateLessonCommand)
export class UpdateLessonHandler implements ICommandHandler<UpdateLessonCommand> {
  constructor(@InjectRepository(Lesson) private readonly repo: Repository<Lesson>) {}

  async execute(command: UpdateLessonCommand): Promise<UpdateResult> {

    const lesson = {
      ...command.lesson,
      mentor: {
        id: command.lesson.mentorId
      },
      student: {
        id: command.lesson.studentId
      }
    }

    delete lesson.mentorId
    delete lesson.studentId
    return this.repo.createQueryBuilder('lesson')
      .update(Lesson)
      .set(lesson)
      .where('lesson.id = :id', {id: command.lessonId})
      .execute()
  }
}