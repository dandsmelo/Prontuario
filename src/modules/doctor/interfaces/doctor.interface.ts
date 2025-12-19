import { ObjectId } from "@fastify/mongodb";

export interface IDoctor {
  _id?: ObjectId;
  nome: string;
  user: string;
  email: string;
  senha: string;
}
