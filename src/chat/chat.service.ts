import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private readonly repo: Repository<Chat>, @InjectRepository(User) private readonly userRepo: Repository<User>) {
  }
  async create(createChatDto: CreateChatDto) {
    const chat = this.repo.create();


    const [user1, user2] = await Promise.all([
      this.userRepo.findOne({where: {id: createChatDto.users[0]}}),
      this.userRepo.findOne({where: {id: createChatDto.users[1]}})
    ])


    if (user1 && user2) {
      chat.users = [user1, user2];
      await this.repo.save(chat);
      return chat;
    }

    throw new Error('One or more users not found');
  }


  findAll() {
    return this.repo.find({relations: {users: true}})
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
