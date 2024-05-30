import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateStudentCommand } from "../commands/create-student.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateStudentCommand)
export class CreateStudentHandler implements ICommandHandler<CreateStudentCommand> {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>) {}

  async execute(command: CreateStudentCommand) {
    return this.studentRepo.save(command.student)
  }
}