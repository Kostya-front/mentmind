
export enum Roles {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  MENTOR = 'mentor',
  STUDENT = 'student'
}

export enum LEARN_DIRECTION {
  MOBILE = 'mobile',
  FULLSTACK = 'fullstack',
  FRONTEND = 'frontend',
  BACKEND = 'backend'
}

export interface IQueryParams {
  skip: number
  take: number
  name: string

}