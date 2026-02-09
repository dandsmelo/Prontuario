import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import { DoctorRepository } from '../repositories/doctor.repository';

export class RegisterDoctorController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, user, email, password } = request.body as {
      name: string;
      user: string;
      email: string;
      password: string;
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

    const hashedPassword = await bcrypt.hash(password, 10);

    await repository.create({
      name,
      user,
      email,
      password: hashedPassword,
    });

    return reply.status(201).send({ message: 'Médico cadastrado com sucesso' });
  }
}
