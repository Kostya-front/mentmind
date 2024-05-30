import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { UpdateStudentCommand } from "../commands/update-student.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Repository } from "typeorm";
import { GetMentorByIdQuery } from "../../mentor/queries/get-mentor-by-id.query";


@CommandHandler(UpdateStudentCommand)
export class UpdateStudentHandler implements ICommandHandler<UpdateStudentCommand> {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: UpdateStudentCommand) {

    if(command.updatedStudent.mentorId) {
      const mentor = await this.queryBus.execute(new GetMentorByIdQuery(command.updatedStudent.mentorId))
      return this.studentRepo.save({mentor, ...command.updatedStudent})
    }

    return this.studentRepo.save({...command.updatedStudent})
  }
}