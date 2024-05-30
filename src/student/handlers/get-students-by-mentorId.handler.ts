import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetStudentsByMentorIdQuery } from "../queries/get-students-by-mentorId.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Repository } from "typeorm";


@QueryHandler(GetStudentsByMentorIdQuery)
export class GetStudentsByMentorIdHandler implements IQueryHandler<GetStudentsByMentorIdQuery> {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>) {}

  async execute(query: GetStudentsByMentorIdQuery) {
    return this.studentRepo.find({where: {mentor: {id: query.mentorId}}})
  }
}