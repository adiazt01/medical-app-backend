import { Module } from '@nestjs/common';
import { TherapeuticActionService } from './therapeutic-action.service';
import { TherapeuticActionController } from './therapeutic-action.controller';

@Module({
  controllers: [TherapeuticActionController],
  providers: [TherapeuticActionService],
})
export class TherapeuticActionModule {}
