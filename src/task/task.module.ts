import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateTaskHandler } from "./handlers/create-task.handler";
import { GetTasksByAdminIdHandler } from "./handlers/get-tasks-by-admin-id.handler";
import { UpdateTask } from "./commands/update-task";
import { UpdateTaskHandler } from "./handlers/update-task.handler";
import { DeleteTaskHandler } from "./handlers/delete-task.handler";


const handlers = [
  CreateTaskHandler,
  GetTasksByAdminIdHandler,
  UpdateTaskHandler,
  DeleteTaskHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Task]), CqrsModule],
  controllers: [TaskController],
  providers: [TaskService, ...handlers],
})
export class TaskModule {}
