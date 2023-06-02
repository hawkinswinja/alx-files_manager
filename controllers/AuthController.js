import { v4 } from 'uuid';
import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(req, res) {
    const auth = req.headers.authorization.split(' ')[1];
    const decode = Buffer.from(auth, 'base64').toString('utf8');
    const email = decode.split(':')[0];
    const password = sha1(decode.split(':')[1]);
    const user = await dbClient.findUser({ email, password });
    if (user) {
      const token = await redisClient.set(v4(), user._id.toString(), 86400);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (await redisClient.get(token)) {
      await redisClient.del(token);
      res.status(204).end();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}
