import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Joke } from 'src/models/joke.model';
import { ReadJokeDto } from './jokes.dto';

@Injectable()
export class JokesService {
  constructor(
    @InjectModel(Joke)
    private jokeModel: typeof Joke,
  ) {}

  /**
   * Retrieves all jokes from the database.
   *
   * @return {Promise<ReadJokeDto[]>} A promise that resolves to an array of Joke objects.
   * @throws {Error} If there is an error retrieving the jokes.
   */
  async findAll(): Promise<ReadJokeDto[]> {
    try {
      const jokes = await this.jokeModel.findAll();
      return jokes;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Finds a joke by its ID.
   *
   * @param {string} id - The ID of the joke.
   * @return {Promise<ReadJokeDto | null>} A promise that resolves to the found joke or null if not found.
   * @throws {Error} If there is an error while finding the joke.
   */
  async findOne(id: string): Promise<ReadJokeDto | null> {
    try {
      const foundJoke = await this.jokeModel.findOne({
        where: { id: parseInt(id) },
      });
      return foundJoke;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Retrieves a random joke from the database.
   *
   * @return {Promise<ReadJokeDto | null>} A promise that resolves to a randomly selected joke or null if no jokes are available.
   * @throws {Error} If there is an error retrieving the random joke.
   */
  async findRandomJoke(): Promise<ReadJokeDto | null> {
    try {
      const count = await this.jokeModel.count();
      const randomIndex = Math.floor(Math.random() * count);
      return this.jokeModel.findOne({
        offset: randomIndex,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Creates a new joke in the database.
   *
   * @param {object} joke - The joke object containing the joke and answer.
   * @param {string} joke.joke - The joke text.
   * @param {string} joke.answer - The answer to the joke.
   * @return {Promise<ReadJokeDto>} A promise that resolves to the created joke.
   */
  async createJoke(joke: {
    joke: string;
    answer: string;
  }): Promise<ReadJokeDto> {
    try {
      const createdJoke: ReadJokeDto = await this.jokeModel.create(joke);
      return createdJoke;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Deletes a joke from the database.
   *
   * @param {string} id - The ID of the joke to be deleted.
   * @return {Promise<number>} A promise that resolves to the number of jokes deleted.
   * @throws {Error} If the joke with the given ID is not found.
   */
  async deleteJoke(id: string): Promise<number> {
    try {
      const deletedJoke = await this.jokeModel.destroy({
        where: { id: parseInt(id) },
      });

      if (deletedJoke === 0) {
        throw new Error('Joke not found');
      }

      return deletedJoke;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
