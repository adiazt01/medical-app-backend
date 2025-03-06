import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { BusinessGuard } from '../auth/guards/business.guard';

@UseGuards(BusinessGuard)
@Controller('business/medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  async findAll() {
    return this.medicineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const medicine = this.medicineService.findOne(id);

    if (!medicine) {
      throw new NotFoundException(`medicine with ID ${id} not found`);
    }
    return medicine;
  }
}
