import { execSync } from "node:child_process";

console.log("Building Valkey...");
execSync("bash build-valkey.sh", { stdio: "inherit" });
console.log("Done");
