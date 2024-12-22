import { Test, TestingModule } from '@nestjs/testing';
import { TherapeuticActionController } from './therapeutic-action.controller';
import { TherapeuticActionService } from './therapeutic-action.service';

describe('TherapeuticActionController', () => {
  let controller: TherapeuticActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TherapeuticActionController],
      providers: [TherapeuticActionService],
    }).compile();

    controller = module.get<TherapeuticActionController>(TherapeuticActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
