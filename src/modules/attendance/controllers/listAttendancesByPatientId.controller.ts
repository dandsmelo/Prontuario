import { FastifyReply, FastifyRequest } from "fastify";
import { AttendanceRepository } from "../repositories/attendance.repository";

export class ListAttendanceByPatientIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { patientId } = request.params as { patientId: string };

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new AttendanceRepository(db);
        const doctorId = request.user.sub;

        const attendances = await repository.listByPatientId(
            patientId,
            doctorId
        );

        if (attendances.length === 0) {
            return reply.status(404).send({ error: 'Nenhum atendimento encontrado.' });
        }

        return reply.send(attendances);
    }
}