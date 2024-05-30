import { ChildEntity, Column, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Mentor } from "../../mentor/entities/mentor.entity";
import { LEARN_DIRECTION } from "../../user/types";
import { Lesson } from "../../lesson/entities/lesson.entity";

@ChildEntity()
export class Student extends User{

  @Column({type: 'integer', default: 0})
  paidMinutes: number

  @Column({
    type: 'enum',
    enum: LEARN_DIRECTION,
    default: LEARN_DIRECTION.FRONTEND
  })
  learnDirection: LEARN_DIRECTION

  @ManyToOne(() => Mentor, (mentor) => mentor.students)
  @JoinColumn()
  mentor: Mentor

  @OneToMany(() => Lesson, (lesson) => lesson.student)
  lessons: Lesson[]
}
