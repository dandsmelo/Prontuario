import { FastifyReply, FastifyRequest } from "fastify";
import { IPatient } from "../interfaces/patient.interface";
import { PatientRepository } from "../repositories/patient.repository";
import { ObjectId } from "@fastify/mongodb";

export class CreatePatientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {
            caseType,
            name,
            birthDate,
            sex,
            phone,
            phoneReservation,
            cpf,
            rg,
            address,
            number,
            complement,
            neighborhood,
            cep,
            diagnosis,
            summary
        } = request.body as IPatient;

        const db = request.server.mongo.db;

        if (!db) {
            return reply.status(500).send({ error: 'Banco indisponível' });
        }

        const doctorId = request.user.sub;

        const repository = new PatientRepository(db);

        const exists = await repository.findByRg(rg);

        if (exists) {
            return reply.status(400).send({ error: 'Paciente já existe' });
        }

        await repository.create({
            doctorId: new ObjectId(doctorId),
            caseType,
            name,
            birthDate,
            sex,
            phone,
            phoneReservation,
            cpf,
            rg,
            address,
            number,
            complement,
            neighborhood,
            cep,
            diagnosis,
            summary,
        });

        return reply.status(200).send()
    }
}