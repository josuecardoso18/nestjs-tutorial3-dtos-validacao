import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { AlunosRepository } from './alunos.repository';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, AlunosRepository],
})
export class AlunosModule {}
