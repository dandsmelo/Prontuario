import { ObjectId } from "@fastify/mongodb";

export interface IPatient {
  _id?: ObjectId;
  doctorId: ObjectId;
  caseType: 'Índice' | 'Familiar';
  name: string;
  birthDate: string;
  sex: 'Feminino' | 'Masculino' | 'Outro';
  phone: string;
  phoneReservation?: string;
  cpf: string;
  rg: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  cep: string;
  diagnosis: string;
  summary: string;
}
