import { CommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetFilteredRequestsQuery } from "../queries/get-filtered-requests.query";
import { InjectRepository } from "@nestjs/typeorm";
import {Request} from "../entities/request.entity";
import { Repository } from "typeorm";


@QueryHandler(GetFilteredRequestsQuery)
export class GetFilteredRequestsHandler implements IQueryHandler<GetFilteredRequestsQuery> {
  constructor(@InjectRepository(Request) private readonly requestRepo: Repository<Request>) {}

  async execute(query: GetFilteredRequestsQuery) {
    // return this.requestType.createQueryBuilder('request')
    //   .where('request.isSelected = :isSelected', {isSelected: query.filter})
    //   .getManyAndCount()
    return this.requestRepo.find({where: {...query.filter}, relations: {admin: true}})
  }
}