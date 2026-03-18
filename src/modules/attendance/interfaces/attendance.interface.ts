import { ObjectId } from "@fastify/mongodb";

export interface IAttendance {
    _id?: ObjectId;
    patientId: ObjectId;
    doctorId: ObjectId;
    date: Date;
    anamnesis: string;
    diagnosis: string;
    conduct: string;
    prescription: string;
    observations?: string;
}