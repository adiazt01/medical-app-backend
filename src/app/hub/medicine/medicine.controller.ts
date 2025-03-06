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
import { OptionsSearchMedicineQuery } from './dto/search-medicine.dto';

@UseGuards(AuthHubGuard)
@Controller('hub/medicines')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto, optionsSearchMedicineQuery?: OptionsSearchMedicineQuery) {
    return await this.medicineService.findAll(paginationDto, optionsSearchMedicineQuery);
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
