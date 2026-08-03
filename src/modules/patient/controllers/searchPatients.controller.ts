import { FastifyReply, FastifyRequest } from "fastify";
import { PatientRepository } from "../repositories/patient.repository";
import { SearchParams } from "../interfaces/patient.interface";

export class SearchPatientsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { field, value } = request.query as { field: SearchParams, value: string };

        const db = request.server.mongo.db;

        if (!db) {
            return reply.send(500).send({ error: 'Banco indisponível' });
        }

        const repository = new PatientRepository(db);
        const doctorId = request.user.sub;
        const patient = await repository.searchByDoctorId(doctorId, field, value);

        return reply.send(patient);
    }
}