import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';

@Controller('hub/position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionService.create(createPositionDto);
  }

  @Get()
  async findAll(@Query() PaginationDto: PaginationDto) {
    return await this.positionService.findAll(PaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.remove(+id);
  }
}
