import { Injectable } from '@nestjs/common';
import { Databaselist, SystemCollection } from 'src/config/db.config';
import { MongoService } from 'src/database/mongodb';
import { Answer } from '../faq/schema/answer.schema';
import { FAQ } from '../faq/schema/faq.schema';

@Injectable()
export class ChatService {
  constructor(private readonly mongoService: MongoService) {}
  async getAnswer(): Promise<Answer> {
    const faq = await this.mongoService.find<FAQ>(Databaselist.SYSTEM, SystemCollection.FAQ, { name: 'Greetings' });
    const answer = await this.mongoService.find<Answer>(Databaselist.SYSTEM, SystemCollection.ANSWER, {
      _id: faq.answerId,
    });
    return answer;
  }
}
