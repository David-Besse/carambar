import { Sequelize } from 'sequelize-typescript';
import { Joke } from '../src/models/joke.model';
import path from 'path';

const dbPath = path.resolve(process.cwd(), '../database/carambar.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  models: [Joke],
});

const jokes = [
  {
    joke: 'Quelle est la femelle du hamster ?',
    answer: 'L’Amsterdam',
  },
  { joke: 'Que dit un oignon quand il se cogne ?', answer: 'Aïe' },
  {
    joke: "Quel est l'animal le plus heureux ?",
    answer: 'Le hibou, parce que sa femme est chouette.',
  },
  {
    joke: "Pourquoi le football c'est rigolo ?",
    answer: 'Parce que Thierry en rit',
  },
  {
    joke: 'Quel est le sport le plus fruité ?',
    answer:
      'La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.',
  },
  {
    joke: 'Que se fait un Schtroumpf quand il tombe ?',
    answer: 'Un Bleu',
  },
  {
    joke: 'Quel est le comble pour un marin ?',
    answer: 'Avoir le nez qui coule',
  },
  {
    joke: "Qu'est ce que les enfants usent le plus à l'école ?",
    answer: 'Le professeur',
  },
  {
    joke: 'Quel est le sport le plus silencieux ?',
    answer: 'Le para-chuuuut',
  },
  {
    joke: 'Quel est le comble pour un joueur de bowling ?',
    answer: 'C’est de perdre la boule',
  },
];

async function seed() {
  await sequelize.sync({ force: true }); // reset database
  await Joke.bulkCreate(jokes); // populate database
  console.log('Seeding done.');
  await sequelize.close();
}

seed().catch((err) => console.error(err));
