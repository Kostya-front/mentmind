import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTask } from "../commands/update-task";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository, UpdateResult } from "typeorm";

@CommandHandler(UpdateTask)
export class UpdateTaskHandler implements ICommandHandler<UpdateTask> {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(command: UpdateTask): Promise<UpdateResult> {
    return this.taskRepo.createQueryBuilder('task')
      .update(Task)
      .set(command.updatedTask)
      .where('id = :id', {id: command.taskId})
      .execute()
  }
}