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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReadJokeDto } from './jokes.dto';
import { Joke, CreateJoke } from 'src/entities/joke.entity';

@ApiTags('Jokes')
@Controller()
export class JokesController {
  constructor(private readonly jokeService: JokesService) {}

  // Get all jokes
  @Get('blagues')
  @ApiOkResponse({
    type: Joke,
    isArray: true,
    description: 'Get all jokes',
  })
  @Header('Content-Type', 'application/json')
  getAllJokes(): Promise<ReadJokeDto[]> {
    return this.jokeService.findAll();
  }

  // Get a random joke
  // NOTE: this route should be placed before the GET('id') route, because the code is read from top to bottom, otherwise it will be inaccessible
  @Get('blagues/random')
  @ApiOkResponse({
    type: Joke,
    isArray: false,
    description: 'Get a random joke',
  })
  @Header('Content-Type', 'application/json')
  getRandomJoke(): Promise<ReadJokeDto | null> {
    return this.jokeService.findRandomJoke();
  }

  // Get a joke by its ID
  @Get('blagues/:id')
  @ApiOkResponse({
    type: Joke,
    isArray: false,
    description: 'Get a joke by its ID',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Header('Content-Type', 'application/json')
  getJokeById(@Param('id') id: string): Promise<ReadJokeDto | null> {
    return this.jokeService.findOne(id);
  }

  // Create a new joke
  @Post('blagues')
  @ApiCreatedResponse({
    type: Joke,
    isArray: false,
    description: 'Created Succesfully',
  })
  @Header('Content-Type', 'application/json')
  createJoke(@Body() joke: CreateJoke): Promise<ReadJokeDto> {
    return this.jokeService.createJoke(joke);
  }

  // Delete a joke
  @Delete('blagues/:id')
  @ApiOkResponse({
    type: Number,
    isArray: false,
    description: 'Deleted Succesfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @Header('Content-Type', 'application/json')
  deleteJoke(@Param('id') id: string): Promise<number> {
    return this.jokeService.deleteJoke(id);
  }
}
