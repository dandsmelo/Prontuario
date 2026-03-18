import { Db, ObjectId } from "mongodb";
import { IAttendance } from "../interfaces/attendance.interface";

export class AttendanceRepository {
    constructor(private db: Db) { }

    async create(data: IAttendance) {
        return this.db.collection<IAttendance>("attendances").insertOne(data);
    }

    async listAll(doctorId: string) {
        return this.db.collection<IAttendance>('attendances')
            .find({
                doctorId: new ObjectId(doctorId)
            }).toArray();
    }

    async listByPatientId(patientId: string, doctorId: string) {
        return this.db.collection<IAttendance>("attendances")
            .find({
                patientId: new ObjectId(patientId),
                doctorId: new ObjectId(doctorId)
            }).toArray();
    }

    async findById(id: string, doctorId: string) {
        return this.db.collection<IAttendance>("attendances")
            .findOne({
                _id: new ObjectId(id),
                doctorId: new ObjectId(doctorId)
            });
    }

}