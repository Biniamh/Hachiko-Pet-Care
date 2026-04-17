import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateBooking } from "@workspace/api-client-react";
import type { Booking as BookingType } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Scissors, Home, Footprints, Stethoscope,
  CheckCircle2, Calendar, Clock, ChevronLeft, ChevronRight,
  User, Mail, Phone, PawPrint, RefreshCw, Loader2,
  Building2, Truck,
} from "lucide-react";

const SERVICES = [
  {
    id: "grooming",
    label: "Spa & Grooming",
    description: "Full bath, styling, nail trim & ear clean",
    icon: Scissors,
    duration: "2–3 hrs",
    price: "On request",
  },
  {
    id: "boarding",
    label: "Overnight Boarding",
    description: "Cozy suite, 24/7 supervision & daily play",
    icon: Home,
    duration: "Per night",
    price: "On request",
  },
  {
    id: "walking",
    label: "Adventure Walk",
    description: "30 or 60-minute walks tailored to your dog",
    icon: Footprints,
    duration: "30–60 min",
    price: "On request",
  },
  {
    id: "vet",
    label: "Veterinary Care",
    description: "Check-ups, vaccinations & wellness plans",
    icon: Stethoscope,
    duration: "30–45 min",
    price: "On request",
  },
];

const SERVICE_PLACES = [
  {
    id: "clinic",
    label: "Office / Clinic",
    description: "Visit us at Gurd Shola, Addis Ababa",
    icon: Building2,
  },
  {
    id: "home",
    label: "Outdoor / Home",
    description: "We come to your home or preferred outdoor location",
    icon: Truck,
  },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];

const detailsSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  petName: z.string().min(1, "Pet's name is required"),
  petBreed: z.string().min(1, "Breed is required"),
  notes: z.string().optional(),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function Booking() {
  const [step, setStep] = useState<1 | 2 | 3 | "confirmed">(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedServicePlace, setSelectedServicePlace] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step1Error, setStep1Error] = useState<string>("");
  const [confirmedBooking, setConfirmedBooking] = useState<BookingType | null>(null);

  const createBooking = useCreateBooking();

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      petName: "",
      petBreed: "",
      notes: "",
    },
  });

  const validateStep1 = () => {
    if (!selectedService) { setStep1Error("Please select a service."); return false; }
    if (!selectedServicePlace) { setStep1Error("Please select a service place."); return false; }
    if (!selectedDate) { setStep1Error("Please choose a date."); return false; }
    if (!selectedTime) { setStep1Error("Please select a time slot."); return false; }
    setStep1Error("");
    return true;
  };

  const handleStep1Next = () => {
    if (validateStep1()) setStep(2);
  };

  const handleConfirm = () => {
    const values = form.getValues();
    createBooking.mutate(
      {
        data: {
          service: selectedService,
          servicePlace: selectedServicePlace,
          date: selectedDate,
          time: selectedTime,
          ownerName: values.ownerName,
          email: values.email,
          phone: values.phone,
          petName: values.petName,
          petBreed: values.petBreed,
          notes: values.notes || null,
        },
      },
      {
        onSuccess: (booking) => {
          setConfirmedBooking(booking);
          setStep("confirmed");
        },
      },
    );
  };

  const resetBooking = () => {
    setSelectedService("");
    setSelectedServicePlace("");
    setSelectedDate("");
    setSelectedTime("");
    setStep1Error("");
    setConfirmedBooking(null);
    createBooking.reset();
    form.reset();
    setStep(1);
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === selectedService);
  const selectedServicePlaceObj = SERVICE_PLACES.find((p) => p.id === selectedServicePlace);

  return (
    <section id="booking" className="py-24 bg-muted/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Easy Online Booking
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4"
          >
            Book an Appointment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/70"
          >
            Choose your service, pick a time, and we'll take care of the rest.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          {/* Progress indicator */}
          {step !== "confirmed" && (
            <div className="flex items-center justify-center gap-3 mb-10">
              {[
                { n: 1, label: "Service & Time" },
                { n: 2, label: "Your Details" },
                { n: 3, label: "Review" },
              ].map(({ n, label }, idx) => {
                const isActive = step === n;
                const isDone = (step === 2 && n === 1) || (step === 3 && n <= 2);
                return (
                  <div key={n} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          isDone || isActive ? "bg-primary text-white" : "bg-border text-muted-foreground"
                        }`}
                      >
                        {isDone ? <CheckCircle2 size={16} /> : n}
                      </div>
                      <span className={`text-sm font-medium hidden sm:block ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {label}
                      </span>
                    </div>
                    {idx < 2 && <div className={`w-8 h-px ${isDone ? "bg-primary" : "bg-border"}`} />}
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-card rounded-2xl shadow-xl border border-border/60 overflow-hidden">
            <AnimatePresence mode="wait">

              {/* ─── STEP 1: Service + Service Place + Date + Time ─── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10"
                >
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Choose a Service</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {SERVICES.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedService === service.id;
                      return (
                        <button
                          key={service.id}
                          onClick={() => { setSelectedService(service.id); setStep1Error(""); }}
                          data-testid={`service-option-${service.id}`}
                          className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40 hover:bg-muted/50"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                            <Icon size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>{service.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{service.description}</p>
                            <div className="flex gap-3 mt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock size={11} /> {service.duration}
                              </span>
                              <span className="text-xs font-medium text-primary">{service.price}</span>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 size={18} className="text-primary shrink-0 ml-auto mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* ─── Service Place ─── */}
                  <div className="mb-8">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-4">Service Place</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICE_PLACES.map((place) => {
                        const Icon = place.icon;
                        const isSelected = selectedServicePlace === place.id;
                        return (
                          <button
                            key={place.id}
                            onClick={() => { setSelectedServicePlace(place.id); setStep1Error(""); }}
                            data-testid={`service-place-${place.id}`}
                            className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/40 hover:bg-muted/50"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                              <Icon size={20} />
                            </div>
                            <div className="min-w-0">
                              <p className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>{place.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{place.description}</p>
                            </div>
                            {isSelected && <CheckCircle2 size={18} className="text-primary shrink-0 ml-auto mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      <span className="flex items-center gap-2"><Calendar size={15} /> Select a Date</span>
                    </label>
                    <input
                      type="date"
                      min={getTodayStr()}
                      value={selectedDate}
                      onChange={(e) => { setSelectedDate(e.target.value); setStep1Error(""); }}
                      data-testid="input-booking-date"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors cursor-pointer"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      <span className="flex items-center gap-2"><Clock size={15} /> Available Time Slots</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => { setSelectedTime(slot); setStep1Error(""); }}
                          data-testid={`time-slot-${slot.replace(/[: ]/g, "-")}`}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                            selectedTime === slot
                              ? "border-primary bg-primary text-white"
                              : "border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {step1Error && <p className="text-destructive text-sm mb-4">{step1Error}</p>}

                  <Button
                    onClick={handleStep1Next}
                    className="w-full h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 gap-2"
                    data-testid="button-step1-next"
                  >
                    Continue <ChevronRight size={18} />
                  </Button>
                </motion.div>
              )}

              {/* ─── STEP 2: Owner & Pet Details ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10"
                >
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      {selectedServiceObj && <selectedServiceObj.icon size={16} />}
                      {selectedServiceObj?.label}
                    </div>
                    <div className="flex items-center gap-2 text-primary/80 font-medium">
                      {selectedServicePlaceObj && <selectedServicePlaceObj.icon size={16} />}
                      {selectedServicePlaceObj?.label}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar size={14} /> {formatDate(selectedDate)}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock size={14} /> {selectedTime}
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Your Details</h3>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => setStep(3))} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="ownerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1.5"><User size={13} /> Your Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" data-testid="input-owner-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1.5"><Phone size={13} /> Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="09XXXXXXXX" type="tel" data-testid="input-phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1.5"><Mail size={13} /> Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="jane@example.com" type="email" data-testid="input-email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="petName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1.5"><PawPrint size={13} /> Pet's Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Buster" data-testid="input-pet-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="petBreed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Breed / Species</FormLabel>
                              <FormControl>
                                <Input placeholder="Labrador Retriever" data-testid="input-pet-breed" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any allergies, medical conditions, or special instructions..."
                                className="min-h-[90px] resize-none"
                                data-testid="input-notes"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="rounded-full gap-1.5"
                          data-testid="button-step2-back"
                        >
                          <ChevronLeft size={16} /> Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 gap-2"
                          data-testid="button-step2-review"
                        >
                          Review Booking <ChevronRight size={18} />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}

              {/* ─── STEP 3: Review & Confirm ─── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10"
                >
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Review Your Booking</h3>
                  <p className="text-muted-foreground mb-8">Please confirm the details below before submitting.</p>

                  <div className="space-y-5">
                    <div className="bg-muted/60 rounded-xl p-5 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Service Details</p>
                      {[
                        { label: "Service", value: selectedServiceObj?.label },
                        { label: "Service Place", value: selectedServicePlaceObj?.label },
                        { label: "Date", value: formatDate(selectedDate) },
                        { label: "Time", value: selectedTime },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-semibold text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-muted/60 rounded-xl p-5 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Owner & Pet</p>
                      {[
                        { label: "Name", value: form.getValues("ownerName") },
                        { label: "Email", value: form.getValues("email") },
                        { label: "Phone", value: form.getValues("phone") },
                        { label: "Pet", value: `${form.getValues("petName")} (${form.getValues("petBreed")})` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-semibold text-foreground">{value}</span>
                        </div>
                      ))}
                      {form.getValues("notes") && (
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-sm text-muted-foreground shrink-0">Notes</span>
                          <span className="text-sm font-semibold text-foreground text-right">{form.getValues("notes")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {createBooking.isError && (
                    <p className="text-destructive text-sm mt-4">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <div className="flex gap-3 mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="rounded-full gap-1.5"
                      data-testid="button-step3-back"
                    >
                      <ChevronLeft size={16} /> Back
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      disabled={createBooking.isPending}
                      className="flex-1 h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 gap-2"
                      data-testid="button-confirm"
                    >
                      {createBooking.isPending ? (
                        <><Loader2 size={18} className="animate-spin" /> Confirming…</>
                      ) : (
                        <>Confirm Booking <CheckCircle2 size={18} /></>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ─── CONFIRMED ─── */}
              {step === "confirmed" && confirmedBooking && (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 md:p-10 text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                    Thank you, {confirmedBooking.ownerName}. We look forward to caring for {confirmedBooking.petName}.
                  </p>
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 inline-block mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Your Reference</p>
                    <p className="text-3xl font-mono font-bold text-foreground tracking-widest">{confirmedBooking.confirmationId}</p>
                  </div>
                  <div className="bg-muted/60 rounded-xl p-5 mb-8 text-left space-y-3 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Service</span>
                      <span className="text-sm font-semibold">{SERVICES.find(s => s.id === confirmedBooking.service)?.label ?? confirmedBooking.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Service Place</span>
                      <span className="text-sm font-semibold">{SERVICE_PLACES.find(p => p.id === confirmedBooking.servicePlace)?.label ?? confirmedBooking.servicePlace}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="text-sm font-semibold">{formatDate(confirmedBooking.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time</span>
                      <span className="text-sm font-semibold">{confirmedBooking.time}</span>
                    </div>
                  </div>
                  <Button
                    onClick={resetBooking}
                    variant="outline"
                    className="rounded-full gap-2"
                    data-testid="button-book-another"
                  >
                    <RefreshCw size={16} /> Book Another Appointment
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
