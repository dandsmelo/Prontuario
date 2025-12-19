import { Db, ObjectId } from 'mongodb';
import { IDoctor } from '../interfaces/doctor.interface';

export class DoctorRepository {
  constructor(private db: Db) { }

  async findAll() {
    return this.db.collection<IDoctor>('doctors').find().toArray();
  }

  async findByUser(user: string) {
    return this.db.collection<IDoctor>('doctors').findOne({ user });
  }

  async findById(id: string) {
    return this.db.collection<IDoctor>('doctors').findOne({ _id: new ObjectId(id) });
  }

  async create(data: any) {
    return this.db.collection<IDoctor>('doctors').insertOne(data);
  }
}
