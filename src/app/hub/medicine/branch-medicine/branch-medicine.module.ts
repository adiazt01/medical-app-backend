import { Module } from '@nestjs/common';
import { BranchMedicineService } from './branch-medicine.service';
import { BranchMedicineController } from './branch-medicine.controller';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchMedicineController],
  providers: [BranchMedicineService],
})
export class BranchMedicineModule {}
