import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { PaginationDto } from 'src/common/database/dto/pagination.dto';
import { AuthHubGuard } from '../../auth/auth-hub/auth-hub.guard';
import { HUB } from '@/common/constants/prefix/hub.prefix';

@UseGuards(AuthHubGuard)
@Controller(HUB.PRESENTATIONS)
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Post()
  async create(@Body() createPresentationDto: CreatePresentationDto) {
    return await this.presentationService.create(createPresentationDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.presentationService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.presentationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePresentationDto: UpdatePresentationDto) {
    return this.presentationService.update(id, updatePresentationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.presentationService.remove(id);
  }
}
