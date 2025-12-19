import { doctorRoutes } from "./modules/doctor/routes/doctor.route";
import { FastifyInstance } from 'fastify';

export async function routes(app: FastifyInstance) {
    app.register(doctorRoutes, { prefix: '/doctors' });
}