import { Roles } from "../../user/types";

export type CreateTokenDto = {
  email: string,
  id: number,
  firstName: string,
  lastName: string,
  role: Roles
}