import jwt from '@fastify/jwt'
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

async function jwtPlugin(fastify: FastifyInstance) {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET as string,
        sign: {
            expiresIn: '1d'
        }
    })
}

export default fastifyPlugin(jwtPlugin);