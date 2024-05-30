import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateTaskCommand } from "./commands/create-task.command";
import { GetTasksByAdminIdQuery } from "./queries/get-tasks-by-admin-id.query";
import { UpdateTask } from "./commands/update-task";
import { DeleteTask } from "./commands/delete-task";
import { RolesGuard } from "../guards/roles-guards/roles.guard";
import { Roles } from "../guards/roles-guards/roles.decorator";

@Controller('task')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly taskService: TaskService
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.commandBus.execute(new CreateTaskCommand(createTaskDto))
  }

  @Get()
  findAllByAdminId(@Query() query: {adminId: string, status: string}) {
    return this.queryBus.execute(new GetTasksByAdminIdQuery(+query.adminId, query.status))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.commandBus.execute(new UpdateTask(+id, updateTaskDto))
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteTask(+id))
  }
}
