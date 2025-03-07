import { Module } from '@nestjs/common';
import { BranchMedicinesService } from './branch-medicines.service';
import { BranchMedicinesController } from './branch-medicines.controller';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchMedicinesController],
  providers: [BranchMedicinesService],
  exports: [BranchMedicinesService]
})
export class BranchMedicinesModule {}
