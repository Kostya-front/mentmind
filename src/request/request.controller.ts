import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from "@nestjs/common";
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import express from "express";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateRequestCommand } from "./commands/create-request.command";
import { AppGateway } from "../app.gateway";
import { EventEmitter } from "node:events";
import { GetFilteredRequestsQuery } from "./queries/get-filtered-requests.query";
import { UpdateRequestCommand } from "./commands/update-request.command";
import { GetRequestsQuery } from "./queries/get-requests.query";

export const eventEmitter = new EventEmitter();

@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,

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
  async create(@Body() createRequestDto: CreateRequestDto) {
    const request = await this.commandBus.execute(new CreateRequestCommand(createRequestDto))
    // eventEmitter.emit('sendMessage', request)
    // this.appGateway.handleDatabaseChange(JSON.stringify(request))
    return request
    // return this.requestService.create(createRequestDto);
  }

  // @Get()
  // findAll() {
  //   return this.queryBus.execute(new GetRequestsQuery())
  // }
  //
  // @Get('/filtered')
  // findFilteredAll(@Query() filter: {isSelected?: boolean, isCompleted?: boolean}) {
  //   return this.queryBus.execute(new GetFilteredRequestsQuery(filter))
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.commandBus.execute(new UpdateRequestCommand({...updateRequestDto, id: +id}))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
