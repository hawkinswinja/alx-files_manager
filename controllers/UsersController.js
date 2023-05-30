import sha1 from 'sha1';
import dbClient from '../utils/db';

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
}
