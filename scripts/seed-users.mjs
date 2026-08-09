import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

async function main() {
  const now = new Date().toISOString();
  const password = process.env.ADMIN_PASSWORD || "1122";
  const passwordHash = await bcrypt.hash(password, 10);

  const users = [
    {
      id: randomUUID(),
      name: process.env.ADMIN_NAME || "Umar",
      email: (process.env.ADMIN_EMAIL || "umar@gmail.com").toLowerCase(),
      passwordHash,
      role: "super_admin",
      enabled: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const dir = path.join(process.cwd(), "content");
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "users.json"), JSON.stringify(users, null, 2) + "\n");
  console.log(`Seeded ${users.length} users → content/users.json`);
  console.log("Login:");
  console.log(`  ${users[0].email} / ${password}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
