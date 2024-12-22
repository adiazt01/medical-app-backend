import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TherapeuticActionService } from './therapeutic-action.service';
import { CreateTherapeuticActionDto } from './dto/create-therapeutic-action.dto';
import { UpdateTherapeuticActionDto } from './dto/update-therapeutic-action.dto';

@Controller('therapeutic-action')
export class TherapeuticActionController {
  constructor(private readonly therapeuticActionService: TherapeuticActionService) {}

  @Post()
  create(@Body() createTherapeuticActionDto: CreateTherapeuticActionDto) {
    return this.therapeuticActionService.create(createTherapeuticActionDto);
  }

  @Get()
  findAll() {
    return this.therapeuticActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.therapeuticActionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTherapeuticActionDto: UpdateTherapeuticActionDto) {
    return this.therapeuticActionService.update(+id, updateTherapeuticActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.therapeuticActionService.remove(+id);
  }
}
