import { Roles } from "../types";

export class CreateUserDto {
  firstName: string

  lastName: string

  role: Roles

  avatar: string

  phone: string

  email: string

  password: string
}
