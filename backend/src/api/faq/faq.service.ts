import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/database/mongodb';
import { CreateFaqDto } from './dto/faq.dto';
import { FAQ } from './schema/faq.schema';
import { ObjectId } from 'mongodb';
import { Databaselist, SystemCollection } from 'src/config/db.config';
import { Answer } from './schema/answer.schema';
import { RedisService } from 'src/database/redis';

@Injectable()
export class FaqService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly redisService: RedisService,
  ) {}
  public async validateFaq(name: string): Promise<void> {
    const faq = await this.mongoService.find<FAQ>(Databaselist.SYSTEM, SystemCollection.FAQ, {
      name: name,
    });
    if (faq) {
      throw new Error('FAQ already exists');
    }
  }
  public async createFAQ(createFaqDto: CreateFaqDto, generatedAnswerId: ObjectId) {
    const newFaq: FAQ = {
      _id: new ObjectId(),
      answerId: generatedAnswerId,
      name: createFaqDto.name,
      EN: {
        question: createFaqDto.EN.question,
      },
      TC: {
        question: createFaqDto.TC.question,
      },
      SC: {
        question: createFaqDto.SC.question,
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
        TC: createFaqDto.answer.TC,
        SC: createFaqDto.answer.SC,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.mongoService.insert<Answer>(Databaselist.SYSTEM, SystemCollection.ANSWER, newAnswer);
  }

  public async getFAQ(name: string): Promise<FAQ> {
    const faqInMemory = await this.redisService.get<FAQ>(`${SystemCollection.FAQ}:${name}`);
    if (faqInMemory) {
      return faqInMemory;
    }
    const faq = await this.mongoService.find<FAQ>(Databaselist.SYSTEM, SystemCollection.FAQ, {
      name: name,
    });
    await this.redisService.set(`${SystemCollection.FAQ}:${name}`, faq);
    return faq;
  }
}
