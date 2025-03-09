import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MedicinePaginationDto } from './dto/medicine-pagination.dto';
import { APP } from '@/common/constants/prefix/app.prefix';

@Controller(APP.MEDICINES)
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  async findAll(@Query() medicinePaginationDto?: MedicinePaginationDto) {
    return this.medicineService.findAll(medicinePaginationDto);
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
