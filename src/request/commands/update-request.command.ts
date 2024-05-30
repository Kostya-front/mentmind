import { UpdateRequestDto } from "../dto/update-request.dto";

export class UpdateRequestCommand {
  constructor(public updatedRequest: UpdateRequestDto) {
  }
}