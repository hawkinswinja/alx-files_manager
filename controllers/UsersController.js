import sha1 from 'sha1';
import { ObjectID } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class UsersController {
  static async postNew(req, res) {
    const { email } = req.body;
    const pw = req.body.password;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    } else if (!pw) {
      res.status(400).json({ error: 'Missing password' });
    } else if (await dbClient.findUser({ email })) {
      res.status(400).json({ error: 'Already exist' });
    } else {
      const data = { email, password: sha1(pw) };
      const id = await dbClient.addUser(data);
      res.status(201).json({ id, email });
    }
  }

  static async getMe(req, res) {
    const id = await redisClient.get(req.headers['x-token']);
    if (id) {
      const user = await dbClient.findUser({ _id: new ObjectID(id) });
      res.json({ id, email: user.email });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}
