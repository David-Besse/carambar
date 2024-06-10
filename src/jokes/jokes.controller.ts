import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
} from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('api')
export class JokesController {
  constructor(private readonly jokeService: JokesService) {}

  // Get all jokes
  @Get('blagues')
  @Header('Content-Type', 'application/json')
  getAllJokes() {
    return this.jokeService.findAll();
  }

  // Get a random joke
  // NOTE: this route should be placed before the GET('id') route, because the code is read from top to bottom, otherwise it will be inaccessible
  @Get('blagues/random')
  @Header('Content-Type', 'application/json')
  getRandomJoke() {
    return this.jokeService.findRandomJoke();
  }

  // Get a joke by its ID
  @Get('blagues/:id')
  @Header('Content-Type', 'application/json')
  getJokeById(@Param('id') id: string) {
    return this.jokeService.findOne(id);
  }

  // Create a new joke
  @Post()
  @Header('Content-Type', 'application/json')
  createJoke(@Body() newjoke: { joke: string; answer: string }) {
    return this.jokeService.createJoke(newjoke);
  }

  // Delete a joke
  @Delete('blagues/:id')
  @Header('Content-Type', 'application/json')
  deleteJoke(@Param('id') id: string) {
    return this.jokeService.deleteJoke(id);
  }
}
