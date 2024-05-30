import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetLessonsByRangeQuery } from "../queries/get-lessons-by-range.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../entities/lesson.entity";
import { Between, Repository } from "typeorm";


@QueryHandler(GetLessonsByRangeQuery)
export class GetLessonsByRangeHandler implements IQueryHandler<GetLessonsByRangeQuery> {
  constructor(@InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>) {}


  async execute(query: GetLessonsByRangeQuery): Promise<Lesson[]> {
    console.log(query.range)
    return this.lessonRepo.find({where: {
      date: Between(query.range.from, query.range.to)
    },
      relations: {mentor: true, student: true}
    })
  }
}