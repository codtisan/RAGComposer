import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/database/mongodb';
import { CreateFaqDto } from './dto/faq.dto';
import { FAQ } from './schema/faq.schema';
import { ObjectId } from 'mongodb';
import { Databaselist, SystemCollection } from 'src/config/db.config';
import { Answer } from './schema/answer.schema';

@Injectable()
export class FaqService {
  constructor(private readonly mongoService: MongoService) {}
  public async createFAQ(createFaqDto: CreateFaqDto, generatedAnswerId: ObjectId) {
    const newFaq: FAQ = {
      _id: new ObjectId(),
      answerId: generatedAnswerId,
      name: createFaqDto.name,
      EN: {
        question: createFaqDto.EN.question,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.mongoService.insert<FAQ>(Databaselist.SYSTEM, SystemCollection.FAQ, newFaq);
  }

  public async createAnswer(createFaqDto: CreateFaqDto, generatedAnswerId: ObjectId) {
    const newAnswer: Answer = {
      _id: generatedAnswerId,
      answer: {
        EN: createFaqDto.answer.EN,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.mongoService.insert<Answer>(Databaselist.SYSTEM, SystemCollection.ANSWER, newAnswer);
  }
}
