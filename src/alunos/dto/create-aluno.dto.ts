import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  curso: string;
}
