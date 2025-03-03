import { IsInt, IsPositive, Max } from 'class-validator';

export class IdParamDTO {
  @IsInt()
  @IsPositive()
  @Max(100)
  id: number;
}
