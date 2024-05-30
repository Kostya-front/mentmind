import { ChildEntity, Column, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Student } from "../../student/entities/student.entity";
import { LEARN_DIRECTION } from "../../user/types";
import { Lesson } from "../../lesson/entities/lesson.entity";

@ChildEntity()
export class Mentor extends User{

  @Column('simple-array')
  learnDirections: LEARN_DIRECTION[]

  @Column({default: 'Ментор'})
  status: string

  @OneToMany(() => Student, (student) => student.mentor)
  students: Student[]

  @OneToMany(() => Lesson, (lesson) => lesson.mentor)
  lessons: Lesson[]
}
