import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { CheckAuthQuery } from "../queries/check-auth.query";
import { VerifyAccessTokenQuery } from "../../token/queries/verify-access-token.query";
import { GetUserByIdQuery } from "../../user/queries/get-user-by-id.query";


@QueryHandler(CheckAuthQuery)
export class CheckAuthHandler implements IQueryHandler<CheckAuthQuery> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(query: CheckAuthQuery): Promise<any> {
    const userData = await this.queryBus.execute(new VerifyAccessTokenQuery(query.accessToken))
    return this.queryBus.execute(new GetUserByIdQuery(userData.id))
  }
}