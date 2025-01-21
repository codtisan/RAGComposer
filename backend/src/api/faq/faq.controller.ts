import { Body, Controller, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/faq.dto';
import { ObjectId } from 'mongodb';
import { MongoService } from 'src/database/mongodb';

@Controller('faq')
export class FaqController {
  constructor(
    private readonly faqService: FaqService,
    private readonly mongoService: MongoService,
  ) {}

  @Post('create')
  async create(@Body() createFaqDto: CreateFaqDto) {
    const generatedAnswerId = new ObjectId();
    this.mongoService.transactionStart([
      () => this.faqService.createFAQ(createFaqDto, generatedAnswerId),
      () => this.faqService.createAnswer(createFaqDto, generatedAnswerId),
    ]);
    return {
      statusCode: 200,
      message: 'FAQ created successfully',
    };
  }
}
