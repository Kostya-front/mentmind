import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";
import { User } from "../../user/entities/user.entity";


@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "text", default: ''})
  text: string

  @Column({type: Date, default: new Date()})
  date: Date

  @Column({type: 'time',  default: '00:00'})
  time: string

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  @ManyToOne(() => User, (user) => user.messages, {onDelete: "CASCADE" })
  user: User

  // @OneToMany(() => Chat, (chat) => chat.messages)
  // @JoinColumn()
  // chat: Chat
}