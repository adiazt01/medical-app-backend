import { Test, TestingModule } from '@nestjs/testing';
import { TherapeuticActionService } from './therapeutic-action.service';

describe('TherapeuticActionService', () => {
  let service: TherapeuticActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TherapeuticActionService],
    }).compile();

    service = module.get<TherapeuticActionService>(TherapeuticActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
