import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateChatCommand } from "../commands/create-chat.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "../entities/chat.entity";
import { Repository } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { GetUsersByIdQuery } from "../../user/queries/get-users-by-id.query";


@CommandHandler(CreateChatCommand)
export class CreateChatHandler implements ICommandHandler<CreateChatCommand> {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CreateChatCommand) {
    const chat = await this.chatRepo.create()

    const users = await this.queryBus.execute(new GetUsersByIdQuery(command.chat.users))

    if(users.length > 0) {
      chat.users = users
      return await this.chatRepo.save(chat)
    }

    throw new HttpException('Нет нужных юзеров', HttpStatus.NOT_FOUND)
  }
}