
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool, PoolOptions } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    const options: PoolOptions = {
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: Number(this.configService.get('DB_PORT', 3308)),
      user: this.configService.get<string>('DB_USER', 'api_user'),
      password: this.configService.get<string>('DB_PASSWORD', 'api123'),
      database: this.configService.get<string>('DB_NAME', 'api_rest'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    this.pool = createPool(options);
  }

  async onModuleInit(): Promise<void> {
    await this.pool.query('SELECT 1');
    console.log('Conexão com o MySQL estabelecida');
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  query<T = any>(
    sql: string,
    values: any[] = [],
  ): Promise<[T, any]> {
    return this.pool.execute(sql, values) as Promise<[T, any]>;
  }
}
