import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Joke } from 'src/models/joke.model';

@Injectable()
export class JokesService {
  constructor(
    @InjectModel(Joke)
    private jokeModel: typeof Joke,
  ) {}

  /**
   * Retrieves all jokes from the database.
   *
   * @return {Promise<Joke[]>} A promise that resolves to an array of Joke objects.
   * @throws {Error} If there is an error retrieving the jokes.
   */
  async findAll(): Promise<Joke[]> {
    try {
      const jokes = await this.jokeModel.findAll();
      console.log('jokes', jokes);
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
   * @return {Promise<Joke | null>} A promise that resolves to the found joke or null if not found.
   * @throws {Error} If there is an error while finding the joke.
   */
  async findOne(id: string): Promise<Joke | null> {
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
   * @return {Promise<Joke | null>} A promise that resolves to a randomly selected joke or null if no jokes are available.
   * @throws {Error} If there is an error retrieving the random joke.
   */
  async findRandomJoke(): Promise<Joke | null> {
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
   * @param {Object} newjoke - The joke object containing the joke and answer.
   * @param {string} newjoke.joke - The joke.
   * @param {string} newjoke.answer - The answer.
   * @return {Promise<Joke>} A promise that resolves to the created joke.
   */
  async createJoke(newjoke: { joke: string; answer: string }): Promise<Joke> {
    try {
      const newJoke = await this.jokeModel.create(newjoke);
      return newJoke;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteJoke(id: string) {
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
