import { Db, ObjectId } from 'mongodb';
import { IPatient } from '../interfaces/patient.interface';

export class PatientRepository {
  constructor(private db: Db) {}

  async findAll() {
    return this.db.collection<IPatient>('patients').find().toArray();
  }

  async findById(id: string) {
    return this.db.collection<IPatient>('patients').findOne({ _id: new ObjectId(id) });
  }

  async findByRg(rg: string) {
    return this.db.collection<IPatient>('patients').findOne({ rg });
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
}
