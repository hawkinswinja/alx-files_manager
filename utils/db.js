import { MongoClient } from 'mongodb';
const host = process.argv.DB_HOST || 'localhost';
const port = process.argv.DB_PORT || 27017;
const database = process.argv.DB_DATABASE || 'files_manager';
const uri = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(uri, { useUnifiedTopology: true});
    this.client.connect((err) => {
      if (err)
        console.log(err);
    });
    this.db = this.client.db(database);
    this.users = this.db.collection('users');
    this.files = this.db.collection('files');
  }

  isAlive() {
    return (this.client.isConnected());
  }

  async nbUsers() {
    return await this.users.countDocuments();
  }
	
  async nbFiles() {
    return await this.files.countDocuments();
  }

  async findUser(query) {
    return await this.users.findOne(query);
  }

  async addUser(data) {
    const result = await this.users.insertOne(data);
    return result.insertedId;
  }
}

const dbClient = new DBClient();
export default dbClient;
