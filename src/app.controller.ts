import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './sub/test/test.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private testSer: TestService) {}

  @Get()
  getHello(): string {
    this.testSer.sayHello();
    return this.appService.getHello();
  }
}
