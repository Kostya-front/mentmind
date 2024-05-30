import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mentor } from "./entities/mentor.entity";
import { CreateMentorHandler } from "./handlers/create-mentor.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { GetMentorsHandler } from "./handlers/get-mentors.handler";
import { GetMentorByIdHandler } from "./handlers/get-mentor-by-id-handler";
import { UpdateMentorHandler } from "./handlers/update-mentor.handler";

const handlers = [
  CreateMentorHandler,
  GetMentorsHandler,
  GetMentorByIdHandler,
  UpdateMentorHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Mentor]), CqrsModule],
  controllers: [MentorController],
  providers: [MentorService, ...handlers],
})
export class MentorModule {}
