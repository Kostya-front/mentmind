import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetChatByIdQuery } from "../queries/get-chat-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "../entities/chat.entity";
import { Repository } from "typeorm";

@QueryHandler(GetChatByIdQuery)
export class GetChatByIdHandler implements IQueryHandler<GetChatByIdQuery> {
  constructor(@InjectRepository(Chat) private readonly chatRepo: Repository<Chat>) {}

  async execute(query: GetChatByIdQuery) {
    return this.chatRepo.findOne({where: {id: query.chatId}, relations: {messages: true, users: true}})
  }
}