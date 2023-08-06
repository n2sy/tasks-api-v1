import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {

    sayHello() {
        console.log("Hello Guys");
        
    }
}
