import { ObjectId } from "@fastify/mongodb";

export interface IAttendance {
    _id?: ObjectId;
    patientId: ObjectId;
    doctorId: ObjectId;
    date: string;
    anamnesis: string;
    diagnosis: string;
    conduct: string;
    prescription: string;
    observations?: string;
}

export type AttendanceSort = 'date' | 'patientName';