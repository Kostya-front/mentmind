import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetStudentsQuery } from "../queries/get-students.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Brackets, Like, Repository } from "typeorm";

@QueryHandler(GetStudentsQuery)
export class GetStudentsHandler implements IQueryHandler<GetStudentsQuery> {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>) {}

  async execute(query: GetStudentsQuery) {
    let whereClause = []

    if(query.queryParams.name) {
      whereClause = [...whereClause,
        {'firstName': Like(`%${query.queryParams.name}%`)},
        {'lastName': Like(`%${query.queryParams.name}%`)}
      ]
    }

    if (+query.queryParams.mentorId) {
      if(whereClause.length) {
        whereClause.forEach(clause => {
          clause.mentor = {id: query.queryParams.mentorId}
        })
      } else {
        whereClause = [{mentor: {id: query.queryParams.mentorId}}]
      }
    }
    return this.studentRepo.find (
      {where: whereClause
        ,
        relations: {mentor: true},
        skip:query.queryParams.skip,
        take: query.queryParams.take
      })
  }
}