import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig)],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
