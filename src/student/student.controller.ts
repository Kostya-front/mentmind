import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UpdateStudentCommand } from "./commands/update-student.command";
import { GetStudentsQuery } from "./queries/get-students.query";
import { GetStudentByIdQuery } from "./queries/get-student-by-id.query";
import { IQueryParams } from "../user/types";
import { GetStudentsByMentorIdQuery } from "./queries/get-students-by-mentorId.query";

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll(@Query() query: IQueryParams) {
    return this.queryBus.execute(new GetStudentsQuery(query))
  }

  @Get('/mentor/:id')
  findByMentorId(@Param('id') id: string) {
    return this.queryBus.execute(new GetStudentsByMentorIdQuery(+id))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetStudentByIdQuery(+id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.commandBus.execute(new UpdateStudentCommand({studentId: +id, ...updateStudentDto}))
    // return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
