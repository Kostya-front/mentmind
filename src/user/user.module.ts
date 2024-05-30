import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { GetUsersByIdHandler } from "./handlers/get-users-by-id.handler";
import { GetUserByIdHandler } from "./handlers/get-user-by-id.handler";
import { GetUserByEmailHandler } from "./handlers/get-user-by-email.handler";
import { UpdateUserHandler } from "./handlers/update-user.handler";
import { CqrsModule } from "@nestjs/cqrs";

const handlers = [
  GetUsersByIdHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
  UpdateUserHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [UserService,...handlers],
  exports: [UserModule]
})
export class UserModule {}
