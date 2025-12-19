import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import { DoctorRepository } from '../repositories/doctor.repository';

export class RegisterDoctorController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { nome, user, email, senha } = request.body as {
      nome: string;
      user: string;
      email: string;
      senha: string;
    };

    const db = request.server.mongo.db;
    if (!db) {
      return reply.status(500).send({ error: 'Banco indisponível' });
    }

    const repository = new DoctorRepository(db);

    const exists = await repository.findByUser(user);
    if (exists) {
      return reply.status(400).send({ error: 'Usuário já existe' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await repository.create({
      nome,
      user,
      email,
      senha: senhaHash,
    });

    return reply.status(201).send({ message: 'Médico cadastrado com sucesso' });
  }
}
