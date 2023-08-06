import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubModule } from './sub/sub.module';
import { ThirdModule } from './third/third.module';
import { TasksController } from './tasks/tasks.controller';
import { FirstMiddleware } from './first/first.middleware';
import { MorganMiddleware } from '@nest-middlewares/morgan';
@Module({
  imports: [SubModule, ThirdModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //V1
    // consumer.apply(FirstMiddleware).forRoutes('tasks/new')

    //V2
    consumer.apply(FirstMiddleware).forRoutes(
      {path : 'tasks*', method : RequestMethod.GET}
    )//.apply(SecondMiddleware).forRoutes()

  }
}
