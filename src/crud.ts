import Redis from "ioredis";
const redis = new Redis({ host: "127.0.0.1", port: 6379 });

async function main() {
  await redis.set("user:1", JSON.stringify({ id: 1, name: "Nam", age: 30 }));
  console.log(await redis.get("user:1"));
  await redis.set("user:1", JSON.stringify({ id: 1, name: "Nam Nguyen", age: 31 }));
  console.log(await redis.get("user:1"));
  await redis.del("user:1");
  console.log(await redis.get("user:1"));
  await redis.quit();
}
main();
