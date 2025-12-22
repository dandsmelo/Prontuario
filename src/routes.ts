import { doctorRoutes } from "./modules/doctor/routes/doctor.route";
import { FastifyInstance } from 'fastify';
import { patientRoutes } from "./modules/patient/routes/patient.route";

export async function routes(app: FastifyInstance) {
    app.register(doctorRoutes, { prefix: '/doctors' });
    app.register(patientRoutes, { prefix: '/patients' });
}