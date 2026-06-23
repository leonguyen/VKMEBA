import { Redis } from "ioredis";

export class ValkeyStore {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(
      process.env.REDIS_URL ?? "redis://127.0.0.1:6379"
    );
  }

  async create<T>(key: string, value: T): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }

  async read<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async update<T>(key: string, value: T): Promise<void> {
    await this.create(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}
