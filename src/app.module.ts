import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { MentorModule } from './mentor/mentor.module';
import { StudentModule } from './student/student.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { AdminModule } from './admin/admin.module';
import { LessonModule } from './lesson/lesson.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { RequestModule } from './request/request.module';
import { AppGateway } from "./app.gateway";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthMiddleware } from "./middleware/auth-middleware";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qwerty',
    database: 'mentmind',
    entities: [],
    synchronize: true,
    autoLoadEntities: true
  }), UserModule, MentorModule, CqrsModule, StudentModule, ChatModule, MessageModule, AdminModule, LessonModule, TaskModule, AuthModule, TokenModule, RequestModule,],
  controllers: [AppController],
  providers: [AppService, AppGateway],
  exports: [AppModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/login', 'auth/check', 'auth/refresh', '/mentor') // исключаем все конечные точки, начинающиеся с 'auth/'
      // .forRoutes('*'); // применяем middleware ко всем остальным конечным точкам
  }
}
