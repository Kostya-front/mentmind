import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTask } from "../commands/delete-task";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";

@CommandHandler(DeleteTask)
export class DeleteTaskHandler implements ICommandHandler<DeleteTask> {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {}

  async execute(command: DeleteTask): Promise<any> {
    return await this.taskRepo.createQueryBuilder('task')
      .delete()
      .from(Task)
      .where('task.id = :id', {id: command.taskId})
      .execute()
  }
}