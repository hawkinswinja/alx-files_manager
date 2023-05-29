import { MongoClient } from 'mongodb';
const host = process.argv.DB_HOST || 'localhost';
const port = process.argv.DB_PORT || 27017;
const database = process.argv.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
	  this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect().then(() => { 
		  this.db = this.client.db(database);
		}).catch((err) => console.log(err));
	}

	isAlive() {
    try {
	    this.db.command({ ping: 1 });
			return true
    } catch(err) {
      return false;
		}
	}

	async nbUsers() {
    const collection = this.db.collection('users');
    return await collection.countDocuments();
	}
	
	async nbUsers() {
    const collection = this.db.collection('files');
    return await collection.countDocuments();
	}
}

const dbClient = new DBClient();
export default dbClient;
