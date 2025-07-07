import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./app/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./app/db/local.db",
  },
  verbose: true,
  strict: true,
}); 