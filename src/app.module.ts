import { Module } from '@nestjs/common';
import { JokesModule } from './jokes/jokes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Joke } from './models/joke.model';

const dbPath = 'src/database/carambar.db';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      storage: dbPath,
      models: [Joke],
    }),
    JokesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
