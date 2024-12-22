import { PartialType } from '@nestjs/mapped-types';
import { CreateTherapeuticActionDto } from './create-therapeutic-action.dto';

export class UpdateTherapeuticActionDto extends PartialType(CreateTherapeuticActionDto) {}
