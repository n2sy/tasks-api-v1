import { Controller, Get } from '@nestjs/common';
import { TestService } from 'src/sub/test/test.service';

@Controller('third')
export class ThirdController {

    constructor(private testSer : TestService) { }

    @Get()
    getThird() {
        return "Third";
    }
}
