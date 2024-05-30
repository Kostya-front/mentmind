import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { User } from "../user/entities/user.entity";
import { UserModule } from "../user/user.module";
import { CreateChatHandler } from "./handlers/create-chat.handler";
import { GetChatsHandler } from "./handlers/get-chats.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { GetChatByIdHandler } from "./handlers/get-chat-by-id.handler";

const handlers = [
  CreateChatHandler,
  GetChatsHandler,
  GetChatByIdHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Chat, User]), CqrsModule, UserModule],
  controllers: [ChatController],
  providers: [ChatService, ...handlers],
  exports: [ChatModule]
})
export class ChatModule {}
