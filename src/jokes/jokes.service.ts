import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Joke } from 'src/models/joke.model';

@Injectable()
export class JokesService {
  jokesList = [
    {
      id: 1,
      joke: 'Quelle est la femelle du hamster ?',
      answer: 'L’Amsterdam',
    },
    { id: 2, joke: 'Que dit un oignon quand il se cogne ?', answer: 'Aïe' },
    {
      id: 3,
      joke: "Quel est l'animal le plus heureux ?",
      answer: 'Le hibou, parce que sa femme est chouette.',
    },
    {
      id: 4,
      joke: "Pourquoi le football c'est rigolo ?",
      answer: 'Parce que Thierry en rit',
    },
    {
      id: 5,
      joke: 'Quel est le sport le plus fruité ?',
      answer:
        'La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.',
    },
    {
      id: 6,
      joke: 'Que se fait un Schtroumpf quand il tombe ?',
      answer: 'Un Bleu',
    },
    {
      id: 7,
      joke: 'Quel est le comble pour un marin ?',
      answer: 'Avoir le nez qui coule',
    },
    {
      id: 8,
      joke: "Qu'est ce que les enfants usent le plus à l'école ?",
      answer: 'Le professeur',
    },
    {
      id: 9,
      joke: 'Quel est le sport le plus silencieux ?',
      answer: 'Le para-chuuuut',
    },
    {
      id: 10,
      joke: 'Quel est le comble pour un joueur de bowling ?',
      answer: 'C’est de perdre la boule',
    },
  ];

  constructor(
    @InjectModel(Joke)
    private readonly jokeModel: typeof Joke,
  ) {}

  async findAll(): Promise<Joke[]> {
    const jokes = await this.jokeModel.findAll();
    return jokes;
  }

  async findOne(id: string): Promise<Joke | null> {
    const foundJoke = await this.jokeModel.findOne({
      where: { id: id },
    });

    return foundJoke;
  }

  async findRandomJoke(): Promise<Joke | null> {
    const count = await this.jokeModel.count();
    const randomIndex = Math.floor(Math.random() * count);
    return this.jokeModel.findOne({
      offset: randomIndex,
    });
  }
}
