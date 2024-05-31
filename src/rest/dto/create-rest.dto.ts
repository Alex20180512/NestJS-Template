import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestDto {
  @ApiProperty({ example: 'Rest name', description: 'The name of the rest' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
