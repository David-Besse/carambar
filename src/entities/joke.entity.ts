import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Joke {
  @ApiPropertyOptional({
    type: Number,
    description: 'Joke ID',
  })
  id: number;
  @ApiProperty({
    type: String,
    description: 'Joke',
  })
  joke: string;
  @ApiProperty({
    type: String,
    description: 'Answer',
  })
  answer: string;
}

export class CreateJoke {
  @ApiPropertyOptional({
    type: String,
    description: 'Joke ID',
    required: false,
  })
  id: number;
  @ApiProperty({
    type: String,
    description: 'Joke',
    required: true,
  })
  joke: string;
  @ApiProperty({
    type: String,
    description: 'Answer',
    required: true,
  })
  answer: string;
}
