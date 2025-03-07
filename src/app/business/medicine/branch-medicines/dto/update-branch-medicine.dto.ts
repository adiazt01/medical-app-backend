import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchMedicineDto } from './create-branch-medicine.dto';

export class UpdateBranchMedicineDto extends PartialType(CreateBranchMedicineDto) {}
