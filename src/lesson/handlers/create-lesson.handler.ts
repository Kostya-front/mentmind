import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateLessonCommand } from "../commands/create-lesson.command";
import { InjectRepository,  } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Repository } from "typeorm";
import { GetMentorByIdQuery } from "../../mentor/queries/get-mentor-by-id.query";
import { GetStudentByIdQuery } from "../../student/queries/get-student-by-id.query";
import * as moment from "moment";
import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(CreateLessonCommand)
export class CreateLessonHandler implements ICommandHandler<CreateLessonCommand> {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CreateLessonCommand) {

    const start = moment(command.lesson.time, 'HH:mm')
    const end = start.clone().add(command.lesson.duration, 'minutes').format('HH:mm')

    const foundLessons = await this.lessonRepo.createQueryBuilder('lesson')
      .where(`
      lesson.date = :date
      AND (:startTime BETWEEN lesson.time AND lesson.finish_time
        OR
        :endTime BETWEEN lesson.time and lesson.finish_time
        or
        lesson.time BETWEEN :startTime and :endTime
        OR
        lesson.finish_time BETWEEN :startTime AND :endTime)
      `, {date: command.lesson.date, startTime: command.lesson.time, endTime: end})
      .andWhere('lesson.mentorId = :mentorId', {mentorId: command.lesson.mentorId})
      .getCount()

    if(foundLessons) {
      throw new HttpException('В это время занятия есть', HttpStatus.CONFLICT)
    }


    const lesson =  await this.lessonRepo.create(command.lesson)

    const mentor = await this.queryBus.execute(new GetMentorByIdQuery(command.lesson.mentorId))
    const student = await this.queryBus.execute(new GetStudentByIdQuery(command.lesson.studentId))

    lesson.mentor = mentor
    lesson.student = student

    return await this.lessonRepo.save(lesson)

  }
}