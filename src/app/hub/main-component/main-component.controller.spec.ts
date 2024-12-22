import { Test, TestingModule } from '@nestjs/testing';
import { MainComponentController } from './main-component.controller';
import { MainComponentService } from './main-component.service';

describe('MainComponentController', () => {
  let controller: MainComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainComponentController],
      providers: [MainComponentService],
    }).compile();

    controller = module.get<MainComponentController>(MainComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
