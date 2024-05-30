import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetLessonsByMentorIdQuery } from "../queries/get-lessons-by-mentor-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Repository } from "typeorm";

@QueryHandler(GetLessonsByMentorIdQuery)
export class GetLessonsByMentorIdHandler implements IQueryHandler<GetLessonsByMentorIdQuery> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}

  async execute(query: GetLessonsByMentorIdQuery) {
     return this.lessonRepo.find({where: {mentor: {id: query.mentorId}}})
}
}