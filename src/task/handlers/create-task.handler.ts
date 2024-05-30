import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateTaskCommand } from "../commands/create-task.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";
import { GetAdminQuery } from "../../admin/queries/get-admin.query";


@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CreateTaskCommand) {
    const admin = await this.queryBus.execute(new GetAdminQuery(command.task.adminId))
    const task = await this.taskRepo.create(command.task)

    task.admin = admin

    return this.taskRepo.save(task)
  }
}