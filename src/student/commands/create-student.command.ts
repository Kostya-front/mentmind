import { CreateStudentDto } from "../dto/create-student.dto";

export class CreateStudentCommand {
  constructor(public student: CreateStudentDto) {
  }
}