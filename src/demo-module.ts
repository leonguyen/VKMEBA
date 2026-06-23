import { ValkeyStore } from "./ValkeyStore.js";

const db = new ValkeyStore();
await db.create("user:1", { id: 1, name: "Nam" });
console.log(await db.read("user:1"));
await db.update("user:1", { id: 1, name: "Updated" });
await db.delete("user:1");
await db.close();
