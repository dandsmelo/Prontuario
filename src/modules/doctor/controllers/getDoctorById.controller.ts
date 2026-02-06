import { FastifyReply, FastifyRequest } from "fastify";
import { DoctorRepository } from "../repositories/doctor.repository";

export class GetDoctorByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.body as { id: string };

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new DoctorRepository(db);
        const doctor = await repository.findById(id)

        if (!doctor) {
            return reply.status(404).send({ error: 'Médico não encontrado' });
        }

        return reply.send({
            id: doctor._id?.toString(),
            name: doctor.name,
            user: doctor.user,
            email: doctor.email,
        });

    }
}