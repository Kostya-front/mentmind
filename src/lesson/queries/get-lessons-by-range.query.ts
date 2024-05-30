
export class GetLessonsByRangeQuery {
  constructor(public range: {from: string, to: string}) {
  }
}