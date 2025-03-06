import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BranchMedicineService } from './branch-medicine.service';
import { CreateBranchMedicineDto } from './dto/create-branch-medicine.dto';
import { UpdateBranchMedicineDto } from './dto/update-branch-medicine.dto';
import { AuthHubGuard } from '../../auth/auth-hub/auth-hub.guard';
import { HUB } from '@/common/constants/prefix/hub.prefix';

@Controller(HUB.BRANCH_MEDICINE)
@UseGuards(AuthHubGuard)
export class BranchMedicineController {
  constructor(private readonly branchMedicineService: BranchMedicineService) {}

  @Post()
  create(@Body() createBranchMedicineDto: CreateBranchMedicineDto) {
    return this.branchMedicineService.create(createBranchMedicineDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.branchMedicineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBranchMedicineDto: UpdateBranchMedicineDto) {
    return this.branchMedicineService.update(+id, updateBranchMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.branchMedicineService.remove(id);
  }
}
