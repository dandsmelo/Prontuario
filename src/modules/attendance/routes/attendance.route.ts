import { FastifyInstance } from "fastify";
import { CreateAttendanceController } from "../controllers/createAttendance.controller";
import { GetAttendanceByIdController } from "../controllers/getAttendanceById.controller";
import { ListAttendanceByPatientIdController } from "../controllers/listAttendancesByPatientId.controller";
import { ListAttendancesController } from "../controllers/listAttendances.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { GenerateAttendanceReportController } from "../controllers/generateAttendanceReport.controller";

export async function attendanceRoutes(app: FastifyInstance) {
    const createAttendance = new CreateAttendanceController();
    const getAttendanceById = new GetAttendanceByIdController();
    const listAttendancesByPatientId = new ListAttendanceByPatientIdController();
    const listAttendances = new ListAttendancesController();
    const generateAttendanceReport = new GenerateAttendanceReportController();

    app.post('/create',
        { preHandler: [authMiddleware] },
        (req, res) => createAttendance.handle(req, res),
    );
    app.get('/',
        { preHandler: [authMiddleware] },
        (req, res) => listAttendances.handle(req, res),
    );
    app.get('/:id',
        { preHandler: [authMiddleware] },
        (req, res) => getAttendanceById.handle(req, res),
    );
    app.get('/:id/report',
        { preHandler: [authMiddleware] },
        (req, res) => generateAttendanceReport.handle(req, res),
    )
    app.get('/patient/:patientId',
        { preHandler: [authMiddleware] },
        (req, res) => listAttendancesByPatientId.handle(req, res),
    );
}