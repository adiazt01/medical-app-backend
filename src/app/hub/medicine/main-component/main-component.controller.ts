import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainComponentService } from './main-component.service';
import { CreateMainComponentDto } from './dto/create-main-component.dto';
import { UpdateMainComponentDto } from './dto/update-main-component.dto';

@Controller('main-component')
export class MainComponentController {
  constructor(private readonly mainComponentService: MainComponentService) {}

  @Post()
  create(@Body() createMainComponentDto: CreateMainComponentDto) {
    return this.mainComponentService.create(createMainComponentDto);
  }

  @Get()
  findAll() {
    return this.mainComponentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainComponentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainComponentDto: UpdateMainComponentDto) {
    return this.mainComponentService.update(+id, updateMainComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainComponentService.remove(+id);
  }
}
