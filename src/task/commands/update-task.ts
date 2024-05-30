import { UpdateTaskDto } from "../dto/update-task.dto";

export class UpdateTask {
  constructor(public taskId: number, public updatedTask: UpdateTaskDto) {
  }
}