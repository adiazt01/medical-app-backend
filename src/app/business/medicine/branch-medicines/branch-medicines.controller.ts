import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BranchMedicinesService } from './branch-medicines.service';
import { APP } from '@/common/constants/prefix/app.prefix';

@Controller(APP.BRANCH_MEDICINES)
export class BranchMedicinesController {
  constructor(
    private readonly branchMedicinesService: BranchMedicinesService,
  ) {}

  @Get('medicines/:medicineId')
  async findOneByMedicineId(
    @Param('medicineId', ParseIntPipe) medicineId: number,
  ) {
    return await this.branchMedicinesService.findOneByMedicineId(medicineId);
  }
}
