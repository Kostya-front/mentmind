import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { User } from "../user/entities/user.entity";
import { Chat } from "../chat/entities/chat.entity";
import { CreateMessageHandler } from "./handlers/create-message.handler";
import { UserModule } from "../user/user.module";
import { ChatModule } from "../chat/chat.module";
import { CqrsModule } from "@nestjs/cqrs";

const handlers = [
  CreateMessageHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Chat]), CqrsModule, UserModule, ChatModule],
  controllers: [MessageController],
  providers: [MessageService, ...handlers],
})
export class MessageModule {}
