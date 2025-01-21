import { Body, Controller, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/faq.dto';
import { ObjectId } from 'mongodb';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post('create')
  async create(@Body() createFaqDto: CreateFaqDto) {
    const generatedAnswerId = new ObjectId();
    await this.faqService.createFAQ(createFaqDto, generatedAnswerId);
    await this.faqService.createAnswer(createFaqDto, generatedAnswerId);
    return {
      statusCode: 200,
      message: 'FAQ created successfully',
    };
  }
}
