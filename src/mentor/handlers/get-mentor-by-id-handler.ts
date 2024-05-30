import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMentorByIdQuery } from "../queries/get-mentor-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Mentor } from "../entities/mentor.entity";
import { Repository } from "typeorm";

@QueryHandler(GetMentorByIdQuery)
export class GetMentorByIdHandler implements IQueryHandler<GetMentorByIdQuery> {
  constructor(@InjectRepository(Mentor) private readonly mentorRepo: Repository<Mentor>) {}

  async execute(query: GetMentorByIdQuery) {
    return this.mentorRepo.findOne({where: {id: query.mentorId}, relations: {students: true}})
  }
}