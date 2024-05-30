import { UpdateMentorDto } from "../dto/update-mentor.dto";


export class UpdateMentor {
  constructor(public id: number, public updateMentor: UpdateMentorDto) {
  }
}