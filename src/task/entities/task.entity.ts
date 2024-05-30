import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../../admin/entities/admin.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({type: 'text', default: 'low'})
  status: string

  @Column({type: 'date', default: new Date()})
  date: string

  @Column({type: 'boolean', default: false})
  isCompleted: boolean

  @Column({type: 'time', default: '00:00'})
  time: string

  @ManyToOne(() => Admin, (admin) => admin.tasks)
  @JoinColumn()
  admin: Admin
}
