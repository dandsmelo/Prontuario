import { FastifyReply, FastifyRequest } from "fastify";
import { AttendanceRepository } from "../repositories/attendance.repository";
import { AttendanceSort } from "../interfaces/attendance.interface";

interface ListAttendancesQuery {
    sortBy?: AttendanceSort;
    order?: 'asc' | 'desc';
}

export class ListAttendancesController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
         const { sortBy = 'date', order = 'desc' } = request.query as ListAttendancesQuery;
        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const repository = new AttendanceRepository(db);
        const doctorId = request.user.sub;

        const attendances = await repository.listAll(
            doctorId,
            sortBy,
            order === 'asc' ? 1 : -1);

        if (attendances.length === 0) {
            return reply.status(404).send({ error: 'Nenhum atendimento encontrado.' });
        }

        return reply.send(attendances);
    }
}