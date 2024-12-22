import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PresentationModule } from './presentation/presentation.module';
import { TherapeuticActionModule } from './therapeutic-action/therapeutic-action.module';
import { MainComponentModule } from './main-component/main-component.module';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService],
  imports: [PresentationModule, TherapeuticActionModule, MainComponentModule],
})
export class MedicineModule {}
