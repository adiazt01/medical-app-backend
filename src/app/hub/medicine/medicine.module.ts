import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PresentationModule } from './presentation/presentation.module';
import { TherapeuticActionModule } from './therapeutic-action/therapeutic-action.module';
import { MainComponentModule } from './main-component/main-component.module';
import { PrismaService } from '@/common/database/prisma.service';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService],
  imports: [PresentationModule, TherapeuticActionModule, MainComponentModule, DatabaseModule],
})
export class MedicineModule {}
