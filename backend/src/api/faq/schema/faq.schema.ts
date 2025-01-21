import { ObjectId } from 'mongodb';

export class FAQ {
  _id: ObjectId;

  answerId: ObjectId;

  name: string;

  EN: {
    question: string[];
  };

  TC: {
    question: string[];
  };

  SC: {
    question: string[];
  };

  createdAt: Date;

  updatedAt: Date;
}
