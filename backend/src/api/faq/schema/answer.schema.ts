import { ObjectId } from 'mongodb';

export class Answer {
  _id: ObjectId;

  answer: {
    EN: string;
    TC: string;
    SC: string;
  };

  createdAt: Date;

  updatedAt: Date;
}
