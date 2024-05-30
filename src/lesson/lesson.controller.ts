import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from "@nestjs/common";
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateLessonCommand } from "./commands/create-lesson.command";
import { GetLessonsQuery } from "./queries/get-lessons.query";
import { GetLessonsByMentorIdQuery } from "./queries/get-lessons-by-mentor-id.query";
import { GetLessonsByStudentIdQuery } from "./queries/get-lessons-by-student-id.query";
import { GetActualLessonsQuery } from "./queries/get-actual-lessons.query";
import { UpdateLessonCommand } from "./commands/update-lesson.command";
import { GetLessonsByRangeQuery } from "./queries/get-lessons-by-range.query";
import { DeleteLessonCommand } from "./commands/delete-lesson.command";
import { Roles } from "../guards/roles-guards/roles.decorator";
import { RolesGuard } from "../guards/roles-guards/roles.guard";
import express from "express";
import { GetLessonById } from "./queries/get-lesson-by-id";


@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.commandBus.execute(new CreateLessonCommand(createLessonDto))
  }

  // @Get('get-one/:id')
  // findOne(@Param('id') id: string) {
  //   return this.queryBus.execute(new GetLessonById(+id))
  // }

  @Get()
  findAll(@Query() query: {id: string, start: string, finish: string}) {
    return this.queryBus.execute(new GetLessonsQuery(+query.id, query.start, query.finish))
  }

  @Get('get-one/:id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetLessonById(+id))
  }

  @Get('mentor/:id')
  findAllByMentorId(@Param('id') id: string) {
    return this.queryBus.execute(new GetLessonsByMentorIdQuery(+id))
  }

  @Get('student/')
  @Roles(['student'])
  @UseGuards(RolesGuard)
  findAllByStudentId(@Req() request: express.Request, @Query() query: {from:string, to: string}) {
    //@ts-ignore
    return this.queryBus.execute(new GetLessonsByStudentIdQuery(+request.user.id, query.from, query.to))
  }

  @Get('actual/')
  findActualLessons() {
    return this.queryBus.execute(new GetActualLessonsQuery())
  }

  @Get('range/')
  findByRange(@Query() query: {from:string, to: string}) {
    console.log(query)
    return this.queryBus.execute(new GetLessonsByRangeQuery(query))
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.commandBus.execute(new UpdateLessonCommand(+id, updateLessonDto))
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(123)
    return this.commandBus.execute(new DeleteLessonCommand(+id))
  }
}
