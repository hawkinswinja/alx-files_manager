import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (e) => console.log(e));
  }

  isAlive() {
    return (this.client.connected);
  }

  async get(key) {
    const get = promisify(this.client.get).bind(this.client);
    const val = await get(key);
    return val;
  }

  async set(key, val, time) {
    await this.client.set(key, val);
    await this.client.expire(key, time);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
