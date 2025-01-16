import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { LaboratoryService } from './laboratory.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Controller('hub/laboratories')
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @Post()
  async create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
    return await this.laboratoryService.create(createLaboratoryDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.laboratoryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.laboratoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLaboratoryDto: UpdateLaboratoryDto) {
    return this.laboratoryService.update(id, updateLaboratoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.laboratoryService.remove(+id);
  }
}
