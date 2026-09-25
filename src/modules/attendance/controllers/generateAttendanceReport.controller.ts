import { FastifyReply, FastifyRequest } from 'fastify';
import { AttendanceRepository } from '../repositories/attendance.repository';
import { PatientRepository } from '../../patient/repositories/patient.repository';
import { GenerateAttendanceReportService } from '../services/generateAttendanceReport.service';

export class GenerateAttendanceReportController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const doctorId = request.user.sub;

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({
                error: 'Banco indisponível'
            });
        }

        const attendanceRepository = new AttendanceRepository(db);
        const patientRepository = new PatientRepository(db);

        const service = new GenerateAttendanceReportService(
            attendanceRepository,
            patientRepository
        );

        const pdf = await service.execute(id, doctorId);

        return reply
            .header('Content-Type', 'application/pdf')
            .header(
                'Content-Disposition',
                `attachment; filename="atendimento-${id}.pdf"`
            )
            .send(pdf);
    }
}