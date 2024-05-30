import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetLessonById } from "../queries/get-lesson-by-id";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Repository } from "typeorm";


@QueryHandler(GetLessonById)
export class GetLessonByIdHandler implements IQueryHandler<GetLessonById> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}

  async execute(query: GetLessonById) {
    return this.lessonRepo.findOne({where: {id: query.id}, relations: {mentor: true, student: true}})
  }
}