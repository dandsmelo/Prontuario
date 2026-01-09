import 'dotenv/config';
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import connection from './plugins/connection';
import jwtPlugin from './plugins/jwt';
import { routes } from './routes';

export const app = fastify({ logger: true });

async function start() {

  await app.register(fastifyCors, ({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  await app.register(connection);
  await app.register(jwtPlugin);
  await app.register(routes);

  try {
    await app.listen({ host: '0.0.0.0', port: 3003 });
    console.log('Server is running at port 3003');
  } catch (err) {
    console.log(err);
  }
}

start();
