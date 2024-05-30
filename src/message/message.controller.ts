import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from "@nestjs/common";
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import express from 'express'
import { EventEmitter } from "node:events";
import { CommandBus } from "@nestjs/cqrs";
import { CreateMessageCommand } from "./commands/create-message.command";

export const eventEmitter = new EventEmitter();

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly commandBus: CommandBus
  ) {}


  @Get('/stream')
  stream(@Param('chatId') chatId: string, @Res() res: express.Response) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    });
    res.flushHeaders();

    eventEmitter.on('sendMessage', (message) => {
      res.write(`data: ${JSON.stringify(message)}\n\n`);
    })
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const message = await this.commandBus.execute(new CreateMessageCommand(createMessageDto))
    eventEmitter.emit('sendMessage', message)
    return message
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
