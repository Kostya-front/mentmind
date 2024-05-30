import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateLessonHandler } from "./handlers/create-lesson.handler";
import { GetLessonsHandler } from "./handlers/get-lessons.handler";
import { GetLessonsByMentorIdHandler } from "./handlers/get-lessons-by-mentor-id.handler";
import { GetLessonsByStudentIdHandler } from "./handlers/get-lessons-by-student-id.handler";
import { GetActualLessonsHandler } from "./handlers/getl-actual-lessons.handler";
import { UpdateLessonHandler } from "./handlers/update-lesson.handler";
import { GetLessonsByRangeHandler } from "./handlers/get-lessons-by-range.handler";
import { DeleteLessonHandler } from "./handlers/delete-lesson.handler";
import { GetLessonByIdHandler } from "./handlers/get-lesson-by-id.handler";

const handlers = [
  CreateLessonHandler,
  GetLessonsHandler,
  GetLessonsByMentorIdHandler,
  GetLessonsByStudentIdHandler,
  GetActualLessonsHandler,
  UpdateLessonHandler,
  GetLessonsByRangeHandler,
  DeleteLessonHandler,
  GetLessonByIdHandler
]
@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), CqrsModule],
  controllers: [LessonController],
  providers: [LessonService, ...handlers],
})
export class LessonModule {}
