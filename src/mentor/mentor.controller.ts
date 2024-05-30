import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { MentorService } from './mentor.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateMentorCommand } from "./commands/create-mentor.command";
import { GetMentorsQuery } from "./queries/get-mentors.query";
import { GetMentorByIdQuery } from "./queries/get-mentor-by-id.query";
import { UpdateMentor } from "./commands/update-mentor";

@Controller('mentor')
export class MentorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly mentorService: MentorService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  create(@Body() createMentorDto: CreateMentorDto) {
    return this.commandBus.execute(new CreateMentorCommand(createMentorDto));
  }

  @Get()
  findAll(@Query() query: {skip: number, take: number, name: string}) {
    return this.queryBus.execute(new GetMentorsQuery(query))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetMentorByIdQuery(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMentorDto: UpdateMentorDto) {
    return this.commandBus.execute(new UpdateMentor(+id, updateMentorDto))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mentorService.remove(+id);
  }
}
