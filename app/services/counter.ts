import { eq } from "drizzle-orm";
import { createDB, counters, type Counter, type NewCounter } from "~/db";

export class CounterService {
  private db: ReturnType<typeof createDB>;

  constructor(d1: D1Database) {
    this.db = createDB(d1);
  }

  async getCounter(id: string): Promise<Counter | null> {
    const result = await this.db.select().from(counters).where(eq(counters.id, id)).limit(1);
    return result[0] || null;
  }

  async getAllCounters(): Promise<Counter[]> {
    return await this.db.select().from(counters);
  }

  async createCounter(data: NewCounter): Promise<Counter> {
    const result = await this.db.insert(counters).values(data).returning();
    return result[0];
  }

  async incrementCounter(id: string): Promise<Counter | null> {
    const counter = await this.getCounter(id);
    if (!counter) return null;

    const result = await this.db
      .update(counters)
      .set({ 
        value: counter.value + 1,
        updatedAt: new Date()
      })
      .where(eq(counters.id, id))
      .returning();

    return result[0];
  }

  async decrementCounter(id: string): Promise<Counter | null> {
    const counter = await this.getCounter(id);
    if (!counter) return null;

    const result = await this.db
      .update(counters)
      .set({ 
        value: Math.max(0, counter.value - 1),
        updatedAt: new Date()
      })
      .where(eq(counters.id, id))
      .returning();

    return result[0];
  }

  async resetCounter(id: string): Promise<Counter | null> {
    const result = await this.db
      .update(counters)
      .set({ 
        value: 0,
        updatedAt: new Date()
      })
      .where(eq(counters.id, id))
      .returning();

    return result[0];
  }
} 