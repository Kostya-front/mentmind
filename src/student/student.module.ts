import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Mentor } from "../mentor/entities/mentor.entity";
import { CreateStudentHandler } from "./handlers/create-student.handler";
import { UpdateStudentHandler } from "./handlers/update-student.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { GetStudentsHandler } from "./handlers/get-students.handler";
import { GetStudentByIdHandler } from "./handlers/get-student-by-id.handler";
import { GetStudentsByMentorIdHandler } from "./handlers/get-students-by-mentorId.handler";


const handlers = [
  CreateStudentHandler,
  UpdateStudentHandler,
  GetStudentsHandler,
  GetStudentByIdHandler,
  GetStudentsByMentorIdHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Student, Mentor]), CqrsModule],
  controllers: [StudentController],
  providers: [StudentService, ...handlers],
})
export class StudentModule {}
