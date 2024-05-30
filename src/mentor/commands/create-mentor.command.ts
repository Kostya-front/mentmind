import { CreateMentorDto } from "../dto/create-mentor.dto";

export class CreateMentorCommand {
  constructor(public mentor: CreateMentorDto) {
  }
}