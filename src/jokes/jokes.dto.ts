import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJokeDto {
  @IsString()
  @IsNotEmpty()
  joke: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class ReadJokeDto {
  @IsNumber()
  id: number;

  @IsString()
  joke: string;

  @IsString()
  answer: string;
}

export class UpdateJokeDto extends CreateJokeDto {
  id: number;

  @IsString()
  joke: string;

  @IsString()
  answer: string;
}

export class DeleteJokeDto {
  @IsNumber()
  id: number;
}
