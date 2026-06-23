import { ValkeyStore } from "./ValkeyStore.js";

// Small delay to ensure Valkey server has completely booted in Docker environment
await new Promise((resolve) => setTimeout(resolve, 1500));

const db = new ValkeyStore();

console.log("--- Creating Record ---");
await db.create("user:1", { id: 1, name: "Nam" });

console.log("--- Reading Record ---");
console.log("Fetched User:", await db.read("user:1"));

console.log("--- Updating Record ---");
await db.update("user:1", { id: 1, name: "Updated" });
console.log("Updated User:", await db.read("user:1"));

console.log("--- Deleting Record ---");
await db.delete("user:1");
console.log("Post-Delete check:", await db.read("user:1"));

await db.close();
console.log("Demo run complete!");
