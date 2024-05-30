import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { AppGateway } from "../app.gateway";
import { CreateRequestHandler } from "./handlers/create-request.handler";
import { Request } from "./entities/request.entity";
import { GetFilteredRequestsHandler } from "./handlers/get-filtered-requests.handler";
import { UpdateRequestHandler } from "./handlers/update-request.handler";
import { GetRequestsHandler } from "./handlers/get-requests.handler";
const handler = [
  CreateRequestHandler,
  GetFilteredRequestsHandler,
  UpdateRequestHandler,
  GetRequestsHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Request]), CqrsModule],
  controllers: [RequestController],
  providers: [RequestService, ...handler],
})
export class RequestModule {}
