import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HachikoLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LogOut, Mail, CheckCircle2, XCircle, Clock,
  PawPrint, Loader2, RefreshCw, Send,
} from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Booking {
  id: number;
  confirmationId: string;
  service: string;
  date: string;
  time: string;
  ownerName: string;
  email: string;
  phone: string;
  petName: string;
  petBreed: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

const SERVICE_LABELS: Record<string, string> = {
  grooming: "Spa & Grooming",
  boarding: "Overnight Boarding",
  walking: "Adventure Walk",
  vet: "Veterinary Care",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }: { status: string }) {
  const isConfirmed = status === "confirmed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
        isConfirmed
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {isConfirmed ? <CheckCircle2 size={11} /> : <Clock size={11} />}
      {status}
    </span>
  );
}

function LoginPage({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json() as { ok?: boolean; user?: string; error?: string };
      if (res.ok && data.user) {
        onLogin(data.user);
      } else {
        setError(data.error ?? "Invalid credentials");
      }
    } catch {
      setError("Could not reach server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex mb-4">
            <HachikoLogo size="sm" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage bookings</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border/60 rounded-2xl shadow-xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
              <XCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-primary hover:bg-primary/90 font-semibold gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export function Admin() {
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [emailStates, setEmailStates] = useState<Record<number, "idle" | "sending" | "sent" | "error">>({});
  const [emailErrors, setEmailErrors] = useState<Record<number, string>>({});

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/me`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json() as { user: string };
        setAdminUser(data.user);
      }
    } catch {
      /* not logged in */
    } finally {
      setChecking(false);
    }
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json() as Booking[];
        setBookings(data);
      }
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/admin/logout`, { method: "POST", credentials: "include" });
    setAdminUser(null);
    setBookings([]);
  };

  const handleSendEmail = async (booking: Booking) => {
    setEmailStates((s) => ({ ...s, [booking.id]: "sending" }));
    setEmailErrors((e) => { const next = { ...e }; delete next[booking.id]; return next; });
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings/${booking.id}/send-email`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (res.ok) {
        setEmailStates((s) => ({ ...s, [booking.id]: "sent" }));
      } else {
        setEmailStates((s) => ({ ...s, [booking.id]: "error" }));
        setEmailErrors((e) => ({ ...e, [booking.id]: data.error ?? "Failed to send" }));
      }
    } catch {
      setEmailStates((s) => ({ ...s, [booking.id]: "error" }));
      setEmailErrors((e) => ({ ...e, [booking.id]: "Network error" }));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (adminUser) loadBookings();
  }, [adminUser]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!adminUser) {
    return <LoginPage onLogin={(user) => setAdminUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="bg-card border-b border-border/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HachikoLogo size="sm" />
            <div className="h-5 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Signed in as <span className="font-medium text-foreground">{adminUser}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full gap-1.5 text-sm"
            >
              <LogOut size={13} /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Bookings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {bookings.length} appointment{bookings.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadBookings}
            disabled={loadingBookings}
            className="rounded-full gap-1.5"
          >
            {loadingBookings ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
            Refresh
          </Button>
        </div>

        {loadingBookings && bookings.length === 0 ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 size={20} className="animate-spin" />
            Loading bookings…
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <PawPrint size={40} className="mx-auto mb-3 opacity-30" />
            <p>No bookings yet</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40">
                    {["Ref #", "Owner / Pet", "Service", "Date & Time", "Contact", "Status", "Action"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => {
                    const emailState = emailStates[b.id] ?? "idle";
                    return (
                      <tr
                        key={b.id}
                        className={`border-b border-border/40 last:border-0 transition-colors hover:bg-muted/30 ${
                          i % 2 === 0 ? "" : "bg-muted/10"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <span className="font-mono font-semibold text-xs text-primary">{b.confirmationId}</span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-foreground">{b.ownerName}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {b.petName} · {b.petBreed}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-foreground">
                          {SERVICE_LABELS[b.service] ?? b.service}
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-foreground">{formatDate(b.date)}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">{b.time}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-foreground">{b.email}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">{b.phone}</p>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant={emailState === "sent" ? "outline" : "default"}
                              disabled={emailState === "sending" || emailState === "sent"}
                              onClick={() => handleSendEmail(b)}
                              className={`rounded-full gap-1.5 text-xs h-8 ${
                                emailState === "sent"
                                  ? "text-primary border-primary"
                                  : emailState === "error"
                                  ? "bg-destructive hover:bg-destructive/90"
                                  : "bg-primary hover:bg-primary/90"
                              }`}
                            >
                              {emailState === "sending" && <Loader2 size={11} className="animate-spin" />}
                              {emailState === "sent" && <CheckCircle2 size={11} />}
                              {emailState === "error" && <XCircle size={11} />}
                              {emailState === "idle" && <Send size={11} />}
                              {emailState === "sending"
                                ? "Sending…"
                                : emailState === "sent"
                                ? "Email Sent"
                                : emailState === "error"
                                ? "Retry"
                                : "Send Email"}
                            </Button>
                            {emailState === "error" && emailErrors[b.id] && (
                              <p className="text-xs text-destructive max-w-[160px]">{emailErrors[b.id]}</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {bookings.map((b) => {
                const emailState = emailStates[b.id] ?? "idle";
                return (
                  <div key={b.id} className="bg-card rounded-2xl border border-border/60 shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-mono font-bold text-sm text-primary">{b.confirmationId}</span>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="font-semibold text-foreground">{b.ownerName}</p>
                    <p className="text-sm text-muted-foreground">{b.petName} · {b.petBreed}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Service</p>
                        <p className="font-medium">{SERVICE_LABELS[b.service] ?? b.service}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date & Time</p>
                        <p className="font-medium">{formatDate(b.date)}</p>
                        <p className="text-xs text-muted-foreground">{b.time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{b.email}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-1.5">
                      <Button
                        size="sm"
                        variant={emailState === "sent" ? "outline" : "default"}
                        disabled={emailState === "sending" || emailState === "sent"}
                        onClick={() => handleSendEmail(b)}
                        className={`rounded-full gap-1.5 w-full ${
                          emailState === "sent"
                            ? "text-primary border-primary"
                            : emailState === "error"
                            ? "bg-destructive hover:bg-destructive/90"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {emailState === "sending" && <Loader2 size={13} className="animate-spin" />}
                        {emailState === "sent" && <CheckCircle2 size={13} />}
                        {emailState === "error" && <XCircle size={13} />}
                        {emailState === "idle" && <Mail size={13} />}
                        {emailState === "sending"
                          ? "Sending…"
                          : emailState === "sent"
                          ? "Email Sent!"
                          : emailState === "error"
                          ? "Retry"
                          : "Send Confirmation Email"}
                      </Button>
                      {emailState === "error" && emailErrors[b.id] && (
                        <p className="text-xs text-destructive">{emailErrors[b.id]}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
