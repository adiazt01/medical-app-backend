import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BranchMedicinesService } from './branch-medicines.service';
import { CreateBranchMedicineDto } from './dto/create-branch-medicine.dto';
import { UpdateBranchMedicineDto } from './dto/update-branch-medicine.dto';
import { APP } from '@/common/constants/prefix/app.prefix';

@Controller(APP.BRANCH_MEDICINES)
export class BranchMedicinesController {
  constructor(private readonly branchMedicinesService: BranchMedicinesService) {}
}
