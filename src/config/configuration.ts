import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface Configuration {
  database: TypeOrmModuleOptions;
  app_port: number;
  app_host: string;
  jwt: JwtModuleOptions;
}

export default () =>
  <Configuration>{
    database: {
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_DB || 'amirBlog',
      entities: [join(__dirname, '../**', '*.entity{.ts,.js}')],
      synchronize: true,
    },
    app_port: parseInt(process.env.APP_PORT, 10) || 3000,
    app_host: process.env.APP_HOST || 'http://localhost',
    jwt: {
      secret: process.env.JWT_SECRET || 'veryRand0mStr1n9',
      expires: parseInt(process.env.JWT_EXPIRE, 10) || 3600,
    },
  };
