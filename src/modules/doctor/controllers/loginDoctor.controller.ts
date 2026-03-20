import { FastifyReply, FastifyRequest } from "fastify";
import { DoctorRepository } from "../repositories/doctor.repository";
import bcrypt from 'bcryptjs';

export class LoginDoctorController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string, password: string }
    const db = request.server.mongo.db;

    if (!db) {
      return reply.status(500).send({ error: 'Banco indisponível' });
    }

    const repository = new DoctorRepository(db);

    const normalizedEmail = email.toLowerCase().trim();
    const doctor = await repository.findByEmail(normalizedEmail);
    if (!doctor) {
      return reply.status(400).send({ error: 'Email ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return reply.status(400).send({ error: 'Email ou senha inválidos' });
    }

    const token = request.server.jwt.sign(
      { email: doctor.email },
      { sub: doctor._id?.toString(), expiresIn: '1d' }
    );

    return reply.send({
      token,
      doctor: {
        id: doctor._id.toString(),
        name: doctor.name,
        email: doctor.email,
      },
    });

  }
}