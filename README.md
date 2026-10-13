# NestJS — Tutorial 3: DTOs, validação e MySQL

Projeto baseado no material do Senac RJ. Inclui DTOs, `class-validator`, `ValidationPipe`, `ParseIntPipe`, `NotFoundException`, camadas Controller → Service → Repository → DatabaseService e CRUD de alunos.

## Requisitos

- Node.js 20 ou superior
- npm
- Docker Desktop (para iniciar um MySQL isolado)

## 1. Instalar dependências

No terminal do VS Code, dentro desta pasta:

```powershell
npm install
```

Se o PowerShell bloquear `npm.ps1`, use:

```powershell
npm.cmd install
```

## 2. Iniciar o banco de dados

Este projeto usa um container e uma porta próprios (3308), para não conflitar com outros tutoriais:

```powershell
docker compose up -d
```

Aguarde alguns segundos para o MySQL inicializar. Não apague volumes de outros projetos.

## 3. Criar a tabela

O banco `api_rest` é criado automaticamente pelo Docker. Execute o arquivo `schema.sql` no MySQL. Exemplo com o cliente dentro do container:

```powershell
docker exec -i mysql-nestjs-tutorial3 mysql -uapi_user -papi123 api_rest < schema.sql
```

Se a redireção `<` não funcionar no PowerShell, abra o MySQL Workbench ou outro cliente e execute o conteúdo de `schema.sql`.

## 4. Iniciar a API

```powershell
npm run start:dev
```

Se precisar, use `npm.cmd run start:dev`.

API: http://localhost:3000  
Listar alunos: http://localhost:3000/alunos

## Endpoints

| Método | Caminho | Ação |
|---|---|---|
| GET | `/alunos` | Lista alunos |
| GET | `/alunos/:id` | Busca um aluno |
| POST | `/alunos` | Cria aluno |
| PUT | `/alunos/:id` | Atualiza aluno |
| DELETE | `/alunos/:id` | Exclui aluno |

### Exemplo de POST

Use Postman/Insomnia ou Thunder Client:

`POST http://localhost:3000/alunos`

Body → JSON:

```json
{
  "nome": "Josué",
  "curso": "Análise e Desenvolvimento de Sistemas"
}
```

- `nome` e `curso` são obrigatórios, texto e máximo de 100 caracteres.
- POST válido retorna `201 Created`.
- ID inválido retorna `400 Bad Request`.
- Aluno inexistente retorna `404 Not Found`.
- DELETE bem-sucedido retorna `204 No Content`.

## Observações

- O `.env` é ignorado pelo Git; publique apenas `.env.example`.
- O banco deste projeto usa a porta 3308 e volume próprio. Ele não apaga nem altera os containers/volumes dos tutoriais anteriores.
