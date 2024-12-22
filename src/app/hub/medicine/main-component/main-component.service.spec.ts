import { Test, TestingModule } from '@nestjs/testing';
import { MainComponentService } from './main-component.service';

describe('MainComponentService', () => {
  let service: MainComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainComponentService],
    }).compile();

    service = module.get<MainComponentService>(MainComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
