import { FastifyReply, FastifyRequest } from "fastify";
import { DoctorRepository } from "../repositories/doctor.repository";
import bcrypt from 'bcryptjs';

export class LoginDoctorController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user, senha } = request.body as { user: string, senha: string }
    const db = request.server.mongo.db;

    if(!db) {
      return reply.status(500).send({ error: 'Banco indisponível' });
    }

    const repository = new DoctorRepository(db);

    const doctor = await repository.findByUser(user);
    if(!doctor) {
        return reply.status(400).send({ error: 'Usuário ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(senha, doctor.senha);
    if(!isPasswordValid) {
      return reply.status(400).send({ error: 'Usuário ou senha inválidos' });
    }

    const token = request.server.jwt.sign(
      { sub: doctor._id?.toString(), user: doctor.user },
      { expiresIn: '1d' }
    );

    return reply.send({
      token,
      doctor: {
        id: doctor._id,
        nome: doctor.nome,
        user: doctor.user,
        email: doctor.email,
      },
    });

  }
}