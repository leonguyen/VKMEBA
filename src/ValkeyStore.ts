import Redis from "ioredis";

export class ValkeyStore {
  constructor(private redis = new Redis()) {}

  async create<T>(key: string, value: T) {
    await this.redis.set(key, JSON.stringify(value));
  }

  async read<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async update<T>(key: string, value: T) {
    await this.create(key, value);
  }

  async delete(key: string) {
    await this.redis.del(key);
  }

  async close() {
    await this.redis.quit();
  }
}
