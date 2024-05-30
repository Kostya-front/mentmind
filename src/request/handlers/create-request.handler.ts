import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRequestCommand } from "../commands/create-request.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(CreateRequestCommand)
export class CreateRequestHandler implements ICommandHandler<CreateRequestCommand> {
  constructor(@InjectRepository(Request) private readonly requestRepo: Repository<Request>) {}

  async execute(command: CreateRequestCommand) {
    try {
      return this.requestRepo.save(command.request)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT)
    }

  }
}