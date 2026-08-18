import { Db, ObjectId } from "mongodb";
import { AttendanceSort, IAttendance } from "../interfaces/attendance.interface";

export class AttendanceRepository {
    constructor(private db: Db) { }

    async create(data: IAttendance) {
        return this.db.collection<IAttendance>("attendances").insertOne(data);
    }

    async listAll(
        doctorId: string,
        sortBy: AttendanceSort = 'date',
        order: 1 | -1 = -1,
    ) {
        const sortField = sortBy === 'patientName'
            ? 'patient.name'
            : 'date';

        return this.db.collection<IAttendance>('attendances')
            .aggregate([
                {
                    $match: {
                        doctorId: new ObjectId(doctorId),
                    },
                },
                {
                    $lookup: {
                        from: 'patients',
                        localField: 'patientId',
                        foreignField: '_id',
                        as: 'patient',
                    },
                },
                {
                    $unwind: '$patient',
                },
                {
                    $sort: {
                        [sortField]: order,
                    },
                },
            ]).toArray();
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