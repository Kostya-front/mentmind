import { CreateUserDto } from "../../user/dto/create-user.dto";
import { LEARN_DIRECTION } from "../../user/types";

export class CreateMentorDto extends CreateUserDto{
  learnDirections: LEARN_DIRECTION[]
}

