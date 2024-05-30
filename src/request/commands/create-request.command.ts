import { CreateRequestDto } from "../dto/create-request.dto";

export class CreateRequestCommand {
  constructor(public request: CreateRequestDto) {
  }
}