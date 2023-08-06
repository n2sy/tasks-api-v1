import { Global, Module } from '@nestjs/common';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';

@Global()
@Module({
  controllers: [TestController],
  providers: [TestService],
  exports : [TestService]
})
export class SubModule {}
