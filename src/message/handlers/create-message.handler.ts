import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateMessageCommand } from "../commands/create-message.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "../entities/message.entity";
import { Repository } from "typeorm";
import { GetChatByIdQuery } from "../../chat/queries/get-chat-by-id.query";
import { GetUserByIdQuery } from "../../user/queries/get-user-by-id.query";

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CreateMessageCommand) {
    const message = await this.messageRepo.create(command.message)
    const chat = await this.queryBus.execute(new GetChatByIdQuery(command.message.chatId))
    const user = await this.queryBus.execute(new GetUserByIdQuery(command.message.userId))

    message.chat = chat
    message.user = user

    return this.messageRepo.save(message)
  }
}