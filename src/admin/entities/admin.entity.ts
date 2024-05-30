import { ChildEntity, Entity, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Task } from "../../task/entities/task.entity";
import { Request } from "../../request/entities/request.entity";

@ChildEntity()
export class Admin extends User{
  @OneToMany(() => Task, (taks) => taks.admin)
  tasks: Admin[]

  @OneToMany(() => Request, (request) => request.admin)
  requests: Request[]
}
