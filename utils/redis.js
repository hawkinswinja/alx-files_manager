import { createClient } from 'redis';
import { promisify } from 'util';
const client = createClient();

class RedisClient {
  constructor() {
    client.on('error', (e) => console.log(e));
  }

	isAlive() {
    return (client.on('connect', () => true) ? true : false);
	}

  async get(key) {
    const get = promisify(client.get).bind(client);
	  return await get(key);
  }

	async set(key, val, time) {
    await client.set(key, val);
    await client.expire(key, time);
  }

	async del(key) {
    await client.del(key);
  }
};

const redisClient = new RedisClient();
export default redisClient;
