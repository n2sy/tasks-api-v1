import { Module } from '@nestjs/common';
import { ThirdController } from './third/third.controller';

@Module({
  controllers: [ThirdController]
})
export class ThirdModule {}
