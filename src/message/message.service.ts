import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Chat } from "../chat/entities/chat.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
  ) {
  }
  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepo.create(createMessageDto)
    const user = await this.userRepo.findOne({where: {id: createMessageDto.userId}})
    const chat = await this.chatRepo.findOne({where: {id: createMessageDto.chatId}})

    message.chat = chat
    message.user = user


    return this.messageRepo.save(message)
  }

  findAll() {
    return this.messageRepo.find({relations: {user: true, chat: true}})
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
