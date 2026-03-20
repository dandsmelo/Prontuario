import { ObjectId } from "@fastify/mongodb";

export interface IDoctor {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
}
