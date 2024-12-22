import { Injectable } from '@nestjs/common';
import { CreateTherapeuticActionDto } from './dto/create-therapeutic-action.dto';
import { UpdateTherapeuticActionDto } from './dto/update-therapeutic-action.dto';

@Injectable()
export class TherapeuticActionService {
  create(createTherapeuticActionDto: CreateTherapeuticActionDto) {
    return 'This action adds a new therapeuticAction';
  }

  findAll() {
    return `This action returns all therapeuticAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} therapeuticAction`;
  }

  update(id: number, updateTherapeuticActionDto: UpdateTherapeuticActionDto) {
    return `This action updates a #${id} therapeuticAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} therapeuticAction`;
  }
}
