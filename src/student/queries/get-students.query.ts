import { IQueryParams } from "../../user/types";

export class GetStudentsQuery {
  constructor(public queryParams: IQueryParams & {mentorId?: number}) {
  }
}