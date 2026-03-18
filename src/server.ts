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

  const apiPort = Number(process.env.PORT);

  try {
    await app.listen({ host: '0.0.0.0', port: apiPort });
    console.log(`Server is running at port ${apiPort}`);
  } catch (err) {
    console.log(err);
  }
}

start();
