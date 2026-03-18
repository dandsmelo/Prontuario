import { FastifyReply, FastifyRequest } from "fastify";
import { PatientRepository } from "../repositories/patient.repository";

export class GetFamilyByIndexIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { indexPatientId } = request.params as { indexPatientId: string }

        const db = request.server.mongo.db;

        if (!db) {
            return reply.send(500).send({ error: 'Banco indisponível' });
        }

        const repository = new PatientRepository(db);
        const doctorId = request.user.sub;

        const patients = await repository.findFamilyByIndexId(
            indexPatientId,
            doctorId,
        )

        if (patients.length === 0) {
            return reply.status(404).send({ error: 'Nenhum familiar encontrado' });
        }

        return reply.send(patients)
    }
}