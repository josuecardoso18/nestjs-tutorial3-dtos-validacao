import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { AlunosRepository } from './alunos.repository';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  findAll() {
    return this.alunosRepository.findAll();
  }

  async findById(id: number) {
    const aluno = await this.alunosRepository.findById(id);
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return aluno;
  }

  create(data: CreateAlunoDto) {
    return this.alunosRepository.create(data.nome, data.curso);
  }

  async update(id: number, data: UpdateAlunoDto) {
    await this.findById(id);
    await this.alunosRepository.update(id, data.nome, data.curso);
    return this.findById(id);
  }

  async delete(id: number) {
    await this.findById(id);
    await this.alunosRepository.delete(id);
  }
}
