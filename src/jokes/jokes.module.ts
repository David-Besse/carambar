import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Joke } from '../models/joke.model';

@Module({
  imports: [SequelizeModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService],
  exports: [JokesService],
})
export class JokesModule {}
