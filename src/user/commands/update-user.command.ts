import { UpdateUserDto } from "../dto/update-user.dto";

export class UpdateUserCommand {
  constructor(public id: number, public updateUser: UpdateUserDto) {
  }
}