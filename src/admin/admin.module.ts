import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { GetAdminByIdHandler } from "./handlers/get-admin-by-id.handler";
import { CreateAdminHandler } from "./handlers/create-admin.handler";

const handlers = [
  GetAdminByIdHandler,
  CreateAdminHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Admin]), CqrsModule],
  controllers: [AdminController],
  providers: [AdminService, ...handlers],
  exports: [AdminModule]
})
export class AdminModule {}
