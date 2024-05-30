
type Student = {studentId: number}

export class GetLessonsByStudentIdQuery {
  constructor(public studentId: number, public from: string, public to: string) {
  }
}