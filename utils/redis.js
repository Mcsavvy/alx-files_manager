import { createClient } from 'redis';

export class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error(err));
  }

  /**
   * checks if redis client is alive
   * @returns {boolean}
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Get the value for a key
   * @param {string} key
   */
  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          // console.error(err);
          reject(err);
        }
        // console.log(`reply: ${reply}`);
        resolve(reply || null);
      });
    });
  }

  /**
   * Set the value for a key
   * @param {string} key
   * @param {string} value
   * @param {number} duration
   *
   * @returns {Promise<boolean>}
   */
  async set(key, value, duration) {
    return this.client.set(key, value, 'EX', duration);
  }

  /**
   * Delete a key
   * @param {string} key
   *
   * @returns {boolean}
   */
  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
