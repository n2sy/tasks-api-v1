import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubModule } from './sub/sub.module';
import { ThirdModule } from './third/third.module';
import { TasksController } from './tasks/tasks.controller';
import { FirstMiddleware } from './first/first.middleware';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { AuthorEntity } from './books/entities/author.entity';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    SubModule,
    ThirdModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'booksDMWM',
      entities: [BookEntity, AuthorEntity],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      dateStrings: true,
      // logging: true,
    }),
    BooksModule,
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    //V1
    // consumer.apply(FirstMiddleware).forRoutes('tasks/new')

    //V2
    consumer
      .apply(FirstMiddleware)
      .forRoutes({ path: 'tasks*', method: RequestMethod.GET }); //.apply(SecondMiddleware).forRoutes()

    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes('tasks');
  }
}
