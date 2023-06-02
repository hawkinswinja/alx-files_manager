import { ObjectID } from 'mongodb';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const FOLDER_PATH = process.argv.FOLDER_PATH || '/tmp/files_manager';

export default class FilesController {
  static async postUpload(req, res) {
    const user = await redisClient.get(req.headers['x-token']);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { name, type, parentId, isPublic, data } = req.body;
   
    if (!name) {
      res.status(400).json({ error: 'Missing name' });
      return;
    } 
    if (!type || !['folder', 'file', 'image'].includes(type)) {
      res.status(400).json({ error: 'Missing type' });
      return;
    }
    if (!data && type !== 'folder') {
      res.status(400).json({ error: 'Missing data' });
      return;
    }
    if (parentId) {
      const file = dbClient.findFile({ name: parentId});
      if (!file) {
        res.status(400).json({ error: 'Parent not found' });
        return;
      }
      if (file.type !== 'folder') {
        res.status(400).json({ error: 'Parent is not a folder' });
        return;
      }
    }
    if (type === 'folder') {
    const id = await dbClient.addFile({ name, type, parentId, isPublic, userId: user._id });
    const file = await dbClient.findFile({ _id: new ObjectID(id) }); 
    res.status(201).json({ id: file._id, useri});
    }
  }
}
