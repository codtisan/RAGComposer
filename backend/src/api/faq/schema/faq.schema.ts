import { ObjectId } from 'mongodb';

export class FAQ {
  _id: ObjectId;

  answerId: ObjectId;

  name: string;

  EN: {
    question: string[];
  };

  createdAt: Date;

  updatedAt: Date;
}
