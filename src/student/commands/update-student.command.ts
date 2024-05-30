import { UpdateStudentDto } from "../dto/update-student.dto";

export type UpdateStudent = {studentId: number} & UpdateStudentDto
export class UpdateStudentCommand {
  constructor(public updatedStudent: UpdateStudent) {
  }
}