import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubModule } from './sub/sub.module';
import { ThirdModule } from './third/third.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [SubModule, ThirdModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
