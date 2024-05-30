import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsersByIdQuery } from "../queries/get-users-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository, In } from "typeorm";

@QueryHandler(GetUsersByIdQuery)
export class GetUsersByIdHandler implements IQueryHandler<GetUsersByIdQuery> {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(query: GetUsersByIdQuery) {
    return this.userRepo.find({where: {id: In(query.users)}})
  }
}