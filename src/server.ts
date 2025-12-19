import 'dotenv/config';
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
export const app = fastify({ logger: true });

async function start() {

  await app.register(fastifyCors, ({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));

  try {
    await app.listen({ host: '0.0.0.0', port: 8080 });
    console.log('Server is running at port 8080');
  } catch (err) {
    console.log(err);
  }
}

start();
