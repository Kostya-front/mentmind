import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetLessonsQuery } from "../queries/get-lessons.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Between, Repository } from "typeorm";
import { Student } from "../../student/entities/student.entity";


@QueryHandler(GetLessonsQuery)
export class GetLessonsHandler implements IQueryHandler<GetLessonsQuery> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}

  async execute(query: GetLessonsQuery) {
    let id = query.id;
    const start = query.start;
    const end = query.finish;

    return this.lessonRepo.find({
      where: [
        {student: {id: query.id}, date: Between(start, end) },
        {mentor: {id: query.id},  date: Between(start, end) },
        {date: Between(start, end)}
      ],
      relations: {
        student: true,
        mentor: true
      }
    })
    // return this.lessonRepo.createQueryBuilder('lesson')
    //   .leftJoinAndSelect('lesson.student', 'student')
    //   .leftJoinAndSelect('lesson.mentor', 'mentor')
    //   .where('lesson.mentor.id = :id OR lesson.student.id = :id', { id: id })
    //   .andWhere(() => Between(start, end))
    //   .select(["lesson",'student.id', 'student.firstName', 'student.lastName', 'mentor.id', 'mentor.firstName', 'mentor.lastName'])
    //   .getMany()
    // if (id) {
    //   // return this.lessonRepo.createQueryBuilder('lesson')
    //   //   .leftJoinAndSelect('lesson.student', 'student')
    //   //   .leftJoinAndSelect('lesson.mentor', 'mentor')
    //   //   .where('lesson.mentor.id = :id OR lesson.student.id = :id', { id: id })
    //   //   .andWhere(() => Between(start, end))
    //   //   .select(["lesson",'student.id', 'student.firstName', 'student.lastName', 'mentor.id', 'mentor.firstName', 'mentor.lastName'])
    //   //   .getMany()
    // } else {
    //   // const start = query.start;
    //   // const end = query.finish;
    //   //
    //   // return this.lessonRepo.find({
    //   //   relations: {student: true, mentor: true},
    //   //   where: {
    //   //     date: Between(start, end)
    //   //   }
    //   // })
    // }
  }
}
