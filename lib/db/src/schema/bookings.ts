import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  confirmationId: text("confirmation_id").notNull().unique(),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  ownerName: text("owner_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  petName: text("pet_name").notNull(),
  petBreed: text("pet_breed").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
