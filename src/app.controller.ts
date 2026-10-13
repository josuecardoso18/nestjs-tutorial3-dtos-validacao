import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      mensagem: 'API NestJS - Tutorial 3',
      recurso: '/alunos',
      endpoints: ['GET /alunos', 'GET /alunos/:id', 'POST /alunos', 'PUT /alunos/:id', 'DELETE /alunos/:id'],
    };
  }
}
