import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import { DoctorRepository } from '../repositories/doctor.repository';

export class RegisterDoctorController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    const db = request.server.mongo.db;
    if (!db) {
      return reply.status(500).send({ error: 'Banco indisponível' });
    }

    const repository = new DoctorRepository(db);

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return reply.status(400).send({ error: 'Email inválido' });
    }

    const exists = await repository.findByEmail(normalizedEmail);
    if (exists) {
      return reply.status(400).send({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await repository.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return reply.status(201).send({ message: 'Médico cadastrado com sucesso' });
  }
}
