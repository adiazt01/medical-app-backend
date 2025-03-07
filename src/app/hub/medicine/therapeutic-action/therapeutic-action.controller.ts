import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TherapeuticActionService } from './therapeutic-action.service';
import { CreateTherapeuticActionDto } from './dto/create-therapeutic-action.dto';
import { UpdateTherapeuticActionDto } from './dto/update-therapeutic-action.dto';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { AuthHubGuard } from '../../auth/auth-hub/auth-hub.guard';
import { HUB } from '@/common/constants/prefix/hub.prefix';

@Controller(HUB.THERAPEUTIC_ACTIONS)
@UseGuards(AuthHubGuard)
export class TherapeuticActionController {
  constructor(private therapeuticActionService: TherapeuticActionService) {}

  @Post()
  create(@Body() createTherapeuticActionDto: CreateTherapeuticActionDto) {
    return this.therapeuticActionService.create(createTherapeuticActionDto);
  }

  @Get()
  async findAll(@Query() paginationDto?: PaginationDto) {
    return await this.therapeuticActionService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.therapeuticActionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTherapeuticActionDto: UpdateTherapeuticActionDto) {
    return this.therapeuticActionService.update(id, updateTherapeuticActionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.therapeuticActionService.remove(id);
  }
}
