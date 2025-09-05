import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const vehicules = pgTable("vehicules", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  brand: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 255 }).notNull(),
  year: integer().default(2000).notNull(),
  kilometers: integer().default(0).notNull(),
});

export const maintenances = pgTable("maintenances", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  vehiculeId: integer()
    .notNull()
    .references(() => vehicules.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  dateDone: date(),
  dateToDo: date().notNull(),
  cost: integer().default(0).notNull(),
  done: boolean().default(false).notNull(),
});

export type Vehicule = typeof vehicules.$inferSelect;
export type Maintenance = typeof maintenances.$inferSelect;
