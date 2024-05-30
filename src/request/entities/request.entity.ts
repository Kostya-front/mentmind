import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../../admin/entities/admin.entity";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  text: string

  @Column({type:'boolean', default: false})
  isSelected: boolean

  @Column({type:'boolean', default: false})
  isCompleted: boolean

  @ManyToOne(() => Admin, (admin) => admin.requests)
  @JoinColumn()
  admin: Admin
}
