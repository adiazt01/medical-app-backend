import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine-query.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PaginationDto } from '@/common/database/dto/pagination.dto';
import { AuthHubGuard } from '../auth/auth-hub/auth-hub.guard';

import { HUB } from '@/common/constants/prefix/hub.prefix';

@UseGuards(AuthHubGuard)
@Controller(HUB.MEDICINES)
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  async findAll(@Query() paginationDto?: PaginationDto) {
    return await this.medicineService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicineService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicineService.remove(id);
  }
}
