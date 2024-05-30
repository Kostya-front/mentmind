import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Message } from "../../message/entities/message.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => User, (user) => user.chats)
  users: User[]

  @OneToMany(() => Message, (message) => message.chat)
  @JoinColumn()
  messages: Message[]
}
