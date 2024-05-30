import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetLessonsByMentorIdQuery } from "../queries/get-lessons-by-mentor-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Between, Repository } from "typeorm";
import { GetLessonsByStudentIdQuery } from "../queries/get-lessons-by-student-id.query";

@QueryHandler(GetLessonsByStudentIdQuery)
export class GetLessonsByStudentIdHandler implements IQueryHandler<GetLessonsByStudentIdQuery> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}

  async execute(query: GetLessonsByStudentIdQuery) {
     return this.lessonRepo.find({where: {student: {id: query.studentId}, date: Between(query.from, query.to)}})
}
}