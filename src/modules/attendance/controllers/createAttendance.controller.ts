import { FastifyReply, FastifyRequest } from "fastify";
import { IAttendance } from "../interfaces/attendance.interface";
import { AttendanceRepository } from "../repositories/attendance.repository";
import { ObjectId } from "@fastify/mongodb";

export class CreateAttendanceController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {
            patientId,
            date,
            anamnesis,
            diagnosis,
            conduct,
            prescription,
            observations
        } = request.body as IAttendance;

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const doctorId = request.user.sub;

        const repository = new AttendanceRepository(db);

        const attendance: IAttendance = {
            patientId: new ObjectId(patientId),
            doctorId: new ObjectId(doctorId),
            date,
            anamnesis,
            diagnosis,
            conduct,
            prescription,
            observations
        };

        await repository.create(attendance);

        return reply.status(201).send();

    }
}