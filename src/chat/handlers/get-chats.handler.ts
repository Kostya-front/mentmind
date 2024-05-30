import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMentorsQuery } from "../../mentor/queries/get-mentors.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { GetChatsQuery } from "../queries/get-chats.query";
import { Chat } from "../entities/chat.entity";
import { Repository } from "typeorm";

@QueryHandler(GetChatsQuery)
export class GetChatsHandler implements IQueryHandler<GetChatsQuery> {
  constructor(@InjectRepository(Chat) private readonly chatRepo: Repository<Chat>) {}

  async execute(query: GetChatsQuery) {
    return this.chatRepo.find({relations: {messages: true, users: true}})
  }
}