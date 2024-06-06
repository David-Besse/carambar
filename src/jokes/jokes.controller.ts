import { Controller, Get, Header, Param } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('blagues')
export class JokesController {
  constructor(private readonly jokeService: JokesService) {}

  // Get all jokes
  @Get()
  @Header('Content-Type', 'application/json')
  getAllJokes() {
    return this.jokeService.findAll();
  }

  // Get a random joke
  // NOTE: this route should be placed before the GET('id') route, because the code is read from top to bottom, otherwise it will be inaccessible
  @Get('random')
  @Header('Content-Type', 'application/json')
  getRandomJoke() {
    return this.jokeService.findRandomJoke();
  }

  // Get a joke by its ID
  @Get('/:id')
  @Header('Content-Type', 'application/json')
  getJokeById(@Param('id') id: string) {
    return this.jokeService.findOne(id);
  }
}
