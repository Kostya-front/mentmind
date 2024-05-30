import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRequestsQuery } from "../queries/get-requests.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "../entities/request.entity";
import { Repository } from "typeorm";
@QueryHandler(GetRequestsQuery)
export class GetRequestsHandler implements ICommandHandler<GetRequestsQuery> {
  constructor(@InjectRepository(Request) private readonly requestRepo: Repository<Request>) {}

  async execute(command: GetRequestsQuery) {
    return this.requestRepo.find({order: {id: 'desc'}, relations: {admin: true}})
  }
}