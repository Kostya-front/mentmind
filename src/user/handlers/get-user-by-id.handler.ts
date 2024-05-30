import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "../queries/get-user-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(query: GetUserByIdQuery) {
    return this.userRepo.findOne({where: {id: query.userId}})
  }
}