import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetActualLessonsQuery } from "../queries/get-actual-lessons.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Repository } from "typeorm";


@QueryHandler(GetActualLessonsQuery)
export class GetActualLessonsHandler implements IQueryHandler<GetActualLessonsQuery> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}


  async execute(query:GetActualLessonsQuery ) {
    return this.lessonRepo.createQueryBuilder('lesson')
      .where('lesson.date = :date', {date: '2024-04-07'})
      .getMany()
  }
}