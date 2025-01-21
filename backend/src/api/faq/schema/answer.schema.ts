import { ObjectId } from 'mongodb';

export class Answer {
  _id: ObjectId;

  answer: {
    EN: string;
  };

  createdAt: Date;

  updatedAt: Date;
}
