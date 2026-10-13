import { Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';

export interface AlunoRow extends RowDataPacket {
  id: number;
  nome: string;
  curso: string;
}

@Injectable()
export class AlunosRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll(): Promise<AlunoRow[]> {
    const [rows] = await this.database.query<AlunoRow[]>(
      'SELECT id, nome, curso FROM alunos ORDER BY id',
    );
    return rows;
  }

  async findById(id: number): Promise<AlunoRow | null> {
    const [rows] = await this.database.query<AlunoRow[]>(
      'SELECT id, nome, curso FROM alunos WHERE id = ?',
      [id],
    );
    return rows[0] ?? null;
  }

  async create(nome: string, curso: string): Promise<{ id: number; nome: string; curso: string }> {
    const [result] = await this.database.query<ResultSetHeader>(
      'INSERT INTO alunos (nome, curso) VALUES (?, ?)',
      [nome, curso],
    );
    return { id: result.insertId, nome, curso };
  }

  async update(id: number, nome: string, curso: string): Promise<void> {
    await this.database.query<ResultSetHeader>(
      'UPDATE alunos SET nome = ?, curso = ? WHERE id = ?',
      [nome, curso, id],
    );
  }

  async delete(id: number): Promise<void> {
    await this.database.query<ResultSetHeader>(
      'DELETE FROM alunos WHERE id = ?',
      [id],
    );
  }
}
