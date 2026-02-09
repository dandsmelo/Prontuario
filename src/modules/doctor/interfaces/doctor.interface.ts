import { ObjectId } from "@fastify/mongodb";

export interface IDoctor {
  _id?: ObjectId;
  name: string;
  user: string;
  email: string;
  password: string;
}
