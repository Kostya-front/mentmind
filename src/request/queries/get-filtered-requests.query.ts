import { FilterRequestSort } from "../type";


export class GetFilteredRequestsQuery {
  constructor(public filter: {isSelected?: boolean, isCompleted?: boolean}) {
  }
}