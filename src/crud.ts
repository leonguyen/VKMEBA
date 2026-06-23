import { Redis } from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379)
});

async function main() {
  
  await redis.set("hello", "world");
  
  const value = await redis.get("hello");
  
  console.log(value);
  
  await redis.del("hello");
  
  await redis.quit();
}

main().catch(console.error);