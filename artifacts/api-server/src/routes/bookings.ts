import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateBookingBody } from "@workspace/api-zod";

const router = Router();

function generateConfirmationId(): string {
  return "HVC-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// GET /api/bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .orderBy(bookingsTable.createdAt);

    res.json(
      bookings.map((b) => ({
        ...b,
        createdAt: b.createdAt.toISOString(),
      })),
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list bookings");
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
});

// POST /api/bookings
router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const confirmationId = generateConfirmationId();

  try {
    const [booking] = await db
      .insert(bookingsTable)
      .values({
        confirmationId,
        service: data.service,
        date: data.date,
        time: data.time,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        petName: data.petName,
        petBreed: data.petBreed,
        notes: data.notes ?? null,
        status: "confirmed",
      })
      .returning();

    res.status(201).json({
      ...booking,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// GET /api/bookings/:id
router.get("/bookings/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, id))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json({
      ...booking,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get booking");
    res.status(500).json({ error: "Failed to retrieve booking" });
  }
});

export default router;
