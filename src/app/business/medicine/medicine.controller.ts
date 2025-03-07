import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
<<<<<<< HEAD
import { BusinessGuard } from '../auth/guards/business.guard';

@UseGuards(BusinessGuard)
@Controller('business/medicine')
=======
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('medicines')
@UseGuards(AuthGuard)
>>>>>>> origin
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
