import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { Resend } from "resend";

const router = Router();

function requireAdmin(
  req: Parameters<Router>[0],
  res: Parameters<Router>[1],
  next: Parameters<Router>[2],
): void {
  if (!req.session?.adminUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/admin/me", (req, res) => {
  if (req.session?.adminUser) {
    res.json({ user: req.session.adminUser });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    res.status(503).json({ error: "Admin credentials not configured. Set ADMIN_PASSWORD environment variable." });
    return;
  }

  if (username === adminUsername && password === adminPassword) {
    req.session.adminUser = username;
    req.session.save((err) => {
      if (err) {
        res.status(500).json({ error: "Session error" });
        return;
      }
      res.json({ ok: true, user: username });
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/admin/bookings", requireAdmin, async (_req, res) => {
  const rows = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
  res.json(rows);
});

router.post("/admin/bookings/:id/send-email", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  const { eq } = await import("drizzle-orm");
  const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));

  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "Email service not configured. Provide a RESEND_API_KEY secret." });
    return;
  }

  const resend = new Resend(apiKey);

  const serviceLabels: Record<string, string> = {
    grooming: "Spa & Grooming",
    boarding: "Overnight Boarding",
    walking: "Adventure Walk",
    vet: "Veterinary Care",
  };

  const serviceLabel = serviceLabels[booking.service] ?? booking.service;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#1a5c2e;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:700;color:#fff;letter-spacing:-0.5px;">🐾 Hachiko Veterinary Care</p>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">Booking Confirmation</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 24px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#1a5c2e;">Hi ${booking.ownerName},</p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#444;">
                Your appointment at Hachiko Veterinary Care is confirmed! Here's a summary of your booking.
              </p>

              <!-- Reference badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f0f9f3;border:1px solid #c3e6cb;border-radius:12px;padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1a5c2e;">Booking Reference</p>
                    <p style="margin:0;font-size:28px;font-weight:700;font-family:monospace;color:#111;">${booking.confirmationId}</p>
                  </td>
                </tr>
              </table>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
                ${[
                  ["Service", serviceLabel],
                  ["Date", formatDate(booking.date)],
                  ["Time", booking.time],
                  ["Status", "Confirmed ✓"],
                  ["Pet", `${booking.petName} (${booking.petBreed})`],
                  ...(booking.notes ? [["Notes", booking.notes]] : []),
                ]
                  .map(
                    ([label, value], i) => `
                  <tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"};">
                    <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;width:36%;">${label}</td>
                    <td style="padding:12px 16px;font-size:13px;color:#111;font-weight:500;">${value}</td>
                  </tr>`,
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 40px;border-top:1px solid #f0f0f0;">
              <p style="margin:0 0 8px;font-size:14px;color:#666;">Questions? We're here to help.</p>
              <p style="margin:0;font-size:14px;color:#666;">
                📞 <a href="tel:5035550199" style="color:#1a5c2e;">(503) 555-0199</a> &nbsp;|&nbsp;
                ✉️ <a href="mailto:hello@hachikovet.com" style="color:#1a5c2e;">hello@hachikovet.com</a>
              </p>
              <p style="margin:24px 0 0;font-size:12px;color:#aaa;">Hachiko Veterinary Care · Portland, OR</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const { error } = await resend.emails.send({
    from: "Hachiko Veterinary Care <onboarding@resend.dev>",
    to: booking.email,
    subject: `Your booking is confirmed — ${booking.confirmationId}`,
    html,
  });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ ok: true, sentTo: booking.email });
});

export default router;
