import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMentorsQuery } from "../queries/get-mentors.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Mentor } from "../entities/mentor.entity";
import { Brackets, Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

@QueryHandler(GetMentorsQuery)
export class GetMentorsHandler implements IQueryHandler<GetMentorsQuery> {
  constructor(@InjectRepository(Mentor) private readonly mentorRepo: Repository<Mentor>) {
  }

  async execute(query: GetMentorsQuery) {
    // return this.mentorRepo.findAndCount({
    //   relations: {messages: true, chats: true, students: true},
    //   skip: query.queryParams.skip || 0,
    //   take: query.queryParams.take || 0
    // })
    try {
      if(!query.queryParams.name) {
        return this.mentorRepo.find({
          relations: {students: true},
          skip: query.queryParams.skip,
          take: query.queryParams.take
        })
      }

      return this.mentorRepo.createQueryBuilder('mentor')
        .leftJoinAndSelect('mentor.students', 'students')
        .where(new Brackets(qb => {
          qb
            .where('mentor.firstName ILIKE :name', {name: `%${query.queryParams.name}%`})
            .orWhere('mentor.lastName ILIKE :name', {name: `%%${query.queryParams.name}%`})

        }))
        .skip(query.queryParams.skip)
        .take(query.queryParams.take)
        .getMany()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT)
    }
  }
}