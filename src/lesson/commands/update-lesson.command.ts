import { UpdateLessonDto } from "../dto/update-lesson.dto";

export class UpdateLessonCommand {
  constructor(public lessonId: number, public lesson: UpdateLessonDto) {
  }
}