import { Module } from '@nestjs/common';
import { JokesModule } from './jokes/jokes.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: 'carambar',
      username: 'root',
      dialect: 'sqlite',
      password: 'root',
      host: 'localhost',
      port: 3306,
      storage: ':memory:',
      models: ['@nestjs/models'],
    }),
    JokesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
