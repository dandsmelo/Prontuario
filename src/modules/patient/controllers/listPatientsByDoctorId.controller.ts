import { FastifyReply, FastifyRequest } from "fastify";
import { PatientRepository } from "../repositories/patient.repository";

export class ListPatientsByDoctorIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const db = request.server.mongo.db;

        if(!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new PatientRepository(db);
        const doctorId = request.user.sub;
        const patients = await repository.findByDoctorId(doctorId);

        if(!patients) {
            return reply.status(200).send({ message: 'Nenhum paciente foi encontrado' });
        }

        return reply.send(patients);
    }
}