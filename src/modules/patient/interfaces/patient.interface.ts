import { ObjectId } from "@fastify/mongodb";

export interface IPatient {
  _id?: ObjectId;
  caso: 'Índice' | 'Familiar';
  nome: string;
  dt_nascimento: string;
  sexo: 'Feminino' | 'Masculino' | 'Outro';
  telefone: string;
  telefone_reserva?: string;
  cpf: string;
  rg: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  diagnostico: string;
  resumo: string;
}
