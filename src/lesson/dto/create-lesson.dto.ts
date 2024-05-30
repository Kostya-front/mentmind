import { Status } from "../types";

export class CreateLessonDto {
  mentorId: number

  studentId: number

  duration: number

  urlVideo: string

  urlMeet: string

  date: string

  time: string

  status: Status
}
