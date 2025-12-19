import { FastifyInstance } from 'fastify';
import { RegisterDoctorController } from '../controllers/registerDoctor.controller';
import { LoginDoctorController } from '../controllers/loginDoctor.controller';
import { GetDoctorByIdController } from '../controllers/getDoctorById.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

export async function doctorRoutes(app: FastifyInstance) {
  const register = new RegisterDoctorController();
  const login = new LoginDoctorController();
  const getById = new GetDoctorByIdController();

  app.post('/register', (req, res) => register.handle(req, res));
  app.post('/login', (req, res) => login.handle(req, res));
  app.get('/:id',
    { preHandler: [authMiddleware] },
    (req, res) => getById.handle(req, res)
  );

}
