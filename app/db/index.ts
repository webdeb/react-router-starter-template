import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function createDB(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type DB = ReturnType<typeof createDB>;
export * from "./schema"; 