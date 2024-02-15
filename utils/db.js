import { MongoClient } from 'mongodb';

export class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;