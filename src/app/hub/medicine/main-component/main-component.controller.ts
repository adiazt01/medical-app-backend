import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MainComponentService } from './main-component.service';
import { CreateMainComponentDto } from './dto/create-main-component.dto';
import { UpdateMainComponentDto } from './dto/update-main-component.dto';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { AuthHubGuard } from '../../auth/auth-hub/auth-hub.guard';

@UseGuards(AuthHubGuard)
@Controller('hub/main-components')
export class MainComponentController {
  constructor(private readonly mainComponentService: MainComponentService) {}

  @Post()
  create(@Body() createMainComponentDto: CreateMainComponentDto) {
    return this.mainComponentService.create(createMainComponentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.mainComponentService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mainComponentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMainComponentDto: UpdateMainComponentDto) {
    return this.mainComponentService.update(id, updateMainComponentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mainComponentService.remove(id);
  }
}
