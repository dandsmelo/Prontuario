import { FastifyInstance } from "fastify";
import { CreatePatientController } from "../controllers/createPatient.controller";
import { ListPatientsController } from "../controllers/listPatient.controller";
import { GetPatientByIdController } from "../controllers/getPatientById.controller";
import { UpdatePatientController } from "../controllers/updatePatient.controller";
import { DeletePatientController } from "../controllers/deletePatient.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

export async function patientRoutes(app: FastifyInstance) {
    const createPatient = new CreatePatientController();
    const listPatient = new ListPatientsController();
    const getByPatientId = new GetPatientByIdController();
    const updatePatient = new UpdatePatientController();
    const deletePatient = new DeletePatientController();

    app.post('/create',
        { preHandler: [authMiddleware] },
        (req, res) => createPatient.handle(req, res));
    app.get('/',
        { preHandler: [authMiddleware] },
        (req, res) => listPatient.handle(req, res));
    app.get('/:id',
        { preHandler: [authMiddleware] },
        (req, res) => getByPatientId.handle(req, res));
    app.put('/:id',
        { preHandler: [authMiddleware] },
        (req, res) => updatePatient.handle(req, res));
    app.delete('/:id',
        { preHandler: [authMiddleware] },
        (req, res) => deletePatient.handle(req, res));

}