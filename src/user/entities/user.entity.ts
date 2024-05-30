import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";
import { Message } from "../../message/entities/message.entity";
import { Roles } from "../types";

@Entity({name: 'users'})
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "text", default: 'Без значения'})
  email: string

  @Column({type: "text", default: 'Без значения'})
  password: string

  @Column({type: "text", default: 'Без значения'})
  firstName: string

  @Column({type: "text", default: 'Без значения'})
  lastName: string

  @Column({type: "text", default: 'Без значения'})
  avatar: string

  @Column({type: 'text', default: 'Без значения'})
  phone: string

  @Column({type: "enum", enum: Roles, default: Roles.STUDENT})
  role: Roles

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats: Chat[]

  @OneToMany(() => Message, (message) => message.user, )
  messages: Message[]
}
