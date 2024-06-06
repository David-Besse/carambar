import { Controller, Get, Header, Param } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Joke } from './joke';

@Controller('blagues')
export class JokesController {
  constructor(private readonly jokeService: JokesService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllJokes(): Joke[] {
    return this.jokeService.getAllJokes();
  }

  @Get('random')
  @Header('Content-Type', 'application/json')
  getRandomJoke() {
    return this.jokeService.getRandomJoke();
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  getJokeById(@Param('id') id: string): Joke | undefined {
    return this.jokeService.getJokeById(parseInt(id));
  }
}
