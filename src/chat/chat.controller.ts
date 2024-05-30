import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateChatCommand } from "./commands/create-chat.command";
import { GetChatsQuery } from "./queries/get-chats.query";

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.commandBus.execute(new CreateChatCommand(createChatDto))
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetChatsQuery())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
