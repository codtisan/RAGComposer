import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  @Type(() => Object)
  EN: {
    question: string[];
  };

  @IsObject()
  @IsNotEmpty()
  @Type(() => Object)
  TC: {
    question: string[];
  };

  @IsObject()
  @IsNotEmpty()
  @Type(() => Object)
  SC: {
    question: string[];
  };

  @IsObject()
  @IsNotEmpty()
  @Type(() => Object)
  answer: {
    EN: string;
    TC: string;
    SC: string;
  };
}
