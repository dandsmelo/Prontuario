import { FastifyReply, FastifyRequest } from "fastify";
import { PatientRepository } from "../repositories/patient.repository";
import { IPatient } from "../interfaces/patient.interface";

export class UpdatePatientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const updateData = request.body as Partial<IPatient>

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new PatientRepository(db);

        const updatedPatient = await repository.updateById(id, updateData);

        if(!updatedPatient) {
            return reply.status(400).send({ error: 'Falha na atualização' });
        }

        return reply.send({ message: "Paciente editado" });
        

    }
}