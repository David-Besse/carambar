import { Controller, Get, Header, Param } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('blagues')
export class JokesController {
  constructor(private readonly jokeService: JokesService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllJokes() {
    return this.jokeService.findAll();
  }

  @Get('random')
  @Header('Content-Type', 'application/json')
  getRandomJoke() {
    return this.jokeService.findRandomJoke();
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  getJokeById(@Param('id') id: string) {
    return this.jokeService.findOne(id);
  }
}
