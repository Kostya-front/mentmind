import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mentor } from "../../mentor/entities/mentor.entity";
import { Student } from "../../student/entities/student.entity";
import { Status } from "../types";
import * as moment from "moment";
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'date', default: new Date()})
  date: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.IN_PROGRESS
  })
  status: Status

  @Column({type: 'time', default: '00:00'})
  time: string

  @Column({type: 'time', default: '00:00'})
  finish_time: string

  @Column({type: 'integer', default: 90})
  duration: number

  @Column({type: 'text', default: ''})
  urlVideo: string

  @Column({type: "int", default: 5})
  rating: number

  @Column({type: 'text', default: ''})
  comment: string

  @Column({type: 'text', default: ''})
  description: string

  @Column({type: 'text', default: ''})
  urlMeet: string

  @ManyToOne(() => Mentor, (mentor) => mentor.lessons)
  @JoinColumn()
  mentor: Mentor

  @ManyToOne(() => Student, (student) => student.lessons)
  @JoinColumn()
  student: Student

  @BeforeInsert()
  setFinishTime() {
    this.finish_time = moment(this.time, 'HH:mm').add(this.duration, 'minutes').format('HH:mm')
  }
} 
