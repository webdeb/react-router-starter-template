import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const counters = sqliteTable("counters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  value: integer("value").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export type Counter = typeof counters.$inferSelect;
export type NewCounter = typeof counters.$inferInsert; 