import { FastifyReply, FastifyRequest } from "fastify";
import { PatientRepository } from "../repositories/patient.repository";

export class GetPatientByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const db = request.server.mongo.db;

        if(!db) {
            return reply.send(500).send({ error: 'Banco indisponível' });
        }

        const repository = new PatientRepository(db);
        const patient = await repository.findById(id);

        if(!patient) {
            return reply.status(404).send({ error: 'Paciente não encontrado' });
        }

        return reply.send({
            ...patient,
            id: patient._id.toString(),
        });

    }
}