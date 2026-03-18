import { FastifyReply, FastifyRequest } from "fastify";
import { AttendanceRepository } from "../repositories/attendance.repository";

export class GetAttendanceByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new AttendanceRepository(db);
        const doctorId = request.user.sub;
        const attendance = await repository.findById(id, doctorId);

        if (!attendance) {
            return reply.status(404).send({ error: 'Atendimento não encontrado.' })
        }

        return reply.send({
            ...attendance,
            id: attendance._id.toString(),
        })
    }
}