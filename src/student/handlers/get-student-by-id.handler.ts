import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetStudentByIdQuery } from "../queries/get-student-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Repository } from "typeorm";


@QueryHandler(GetStudentByIdQuery)
export class GetStudentByIdHandler implements IQueryHandler<GetStudentByIdQuery> {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>) {}

  async execute(query: GetStudentByIdQuery) {
    return this.studentRepo.findOne({ where: {id: query.studentId}, relations: {mentor: true}})
  }
}