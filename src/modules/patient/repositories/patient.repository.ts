import { Db, ObjectId } from 'mongodb';
import { IPatient, SearchParams } from '../interfaces/patient.interface';

export class PatientRepository {
  constructor(private db: Db) { }

  async findAll() {
    return this.db.collection<IPatient>('patients').find().toArray();
  }

  async findByDoctorId(doctorId: string) {
    return this.db.collection<IPatient>('patients').find({ doctorId: new ObjectId(doctorId) }).toArray();
  }

  async findById(id: string) {
    return this.db.collection<IPatient>('patients').findOne({ _id: new ObjectId(id) });
  }

  async findFamilyByIndexId(indexId: string, doctorId: string) {
    return this.db.collection<IPatient>('patients').find({
      indexPatientId: new ObjectId(indexId),
      doctorId: new ObjectId(doctorId)
    }).toArray();
  }

  async create(data: IPatient) {
    return this.db.collection<IPatient>('patients').insertOne(data);
  }

  async updateById(id: string, data: Partial<IPatient>) {
    return this.db.collection<IPatient>('patients')
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
  }

  async deleteById(id: string) {
    return this.db.collection<IPatient>('patients').deleteOne({ _id: new ObjectId(id) });
  }

  async searchByDoctorId(doctorId: string, field: SearchParams, value: string,
  ) {
    return this.db.collection<IPatient>('patients').find({
      doctorId: new ObjectId(doctorId),
      [field]: {
        $regex: value,
        $options: 'i',
      },
    }).toArray();
  }
}
