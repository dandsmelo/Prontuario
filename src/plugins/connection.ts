import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from '@fastify/mongodb'; 

async function connection(fastify: FastifyInstance) {
  try {
    await fastify.register(fastifyMongodb, {
      url: process.env.MONGO_URL,
    });
    fastify.log.info('MongoDB conectado');
  } catch (err) {
    fastify.log.error( { err }, 'Erro ao conectar no MongoDB');
    throw err;
  }
}

export default fastifyPlugin(connection);


