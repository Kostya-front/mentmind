import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByEmailQuery } from "../queries/get-user-by-email.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async execute(query: GetUserByEmailQuery) {
    return this.userRepo.findOne({where: {email: query.email}})
  }
}