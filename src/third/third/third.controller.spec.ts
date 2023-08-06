import { Test, TestingModule } from '@nestjs/testing';
import { ThirdController } from './third.controller';

describe('ThirdController', () => {
  let controller: ThirdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirdController],
    }).compile();

    controller = module.get<ThirdController>(ThirdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
