import { createClient } from 'redis';
import dbClient from '../utils/db';

let redis;
const client = createClient();
client.on('ready', () => {
  redis = true;
})
  .on('error', () => {
    redis = false;
  });

export default class AppController {
  static getStatus(req, res) {
    res.json({ redis, db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.json({ users, files });
  }
}
