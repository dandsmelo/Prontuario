import { FastifyReply, FastifyRequest } from "fastify";
import { PatientRepository } from "../repositories/patient.repository";

export class DeletePatientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const db = request.server.mongo.db;
        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new PatientRepository(db);
        const deletedPatient = await repository.deleteById(id);
        
        if(!deletedPatient) {
            return reply.status(404).send({ error: 'Paciente não encontrado' });
        }

        return reply.send({ message: "Paciente deletado", deletedPatient});
    }
}