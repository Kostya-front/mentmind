import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAdminQuery } from "../queries/get-admin.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "../entities/admin.entity";
import { Repository } from "typeorm";


@QueryHandler(GetAdminQuery)
export class GetAdminByIdHandler implements IQueryHandler<GetAdminQuery> {
  constructor(@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>) {}

  async execute(query: GetAdminQuery) {
    return this.adminRepo.findOne({where: {id: query.adminId}})
  }
}