import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTasksByAdminIdQuery } from "../queries/get-tasks-by-admin-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";

@QueryHandler(GetTasksByAdminIdQuery)
export class GetTasksByAdminIdHandler implements IQueryHandler<GetTasksByAdminIdQuery> {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(query: GetTasksByAdminIdQuery) {
    const statuses = {
      'all': {where: {admin: {id: query.adminId}}},
      'true': {where: {admin: {id: query.adminId}, isCompleted: true}},
      'false': {where: {admin: {id: query.adminId}, isCompleted: false}}
    }

    return this.taskRepo.find(statuses[query.status])
  }
}