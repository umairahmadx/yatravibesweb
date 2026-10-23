import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { X, Send } from "lucide-react";
import { EASE } from "./motion";

/**
 * ---------------------------------------------------------------------------
 * FUTURE ENDPOINT — the only line to change when a real backend exists.
 * The original app POSTed to `${REACT_APP_BACKEND_URL}/api/enquiries`.
 * This static rebuild has NO backend, so nothing is posted anywhere: the form
 * validates, then says plainly that the demo is not connected. Fill this in
 * with a real URL and switch `DEMO_MODE` off to send for real.
 * ---------------------------------------------------------------------------
 */
const ENQUIRY_ENDPOINT = ""; // e.g. "https://api.example.com/api/enquiries"
const DEMO_MODE = true;

const inputCls =
  "w-full bg-[#0C0E13] border border-white/15 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#E2A855] transition-colors duration-300";

const emptyForm = {
  name: "",
  phone: "",
  destination: "",
  car: "",
  travel_date: "",
  passengers: "",
  message: "",
};

type EnquiryModalProps = {
  open: boolean;
  onClose: () => void;
  presetCar?: string;
  presetDestination?: string;
};

export default function EnquiryModal({ open, onClose, presetCar = "", presetDestination = "" }: EnquiryModalProps) {
  const [form, setForm] = useState({ ...emptyForm });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, car: presetCar || f.car, destination: presetDestination || f.destination }));
    }
  }, [open, presetCar, presetDestination]);

  // Escape closes (added in the rebuild — the original only closed on X/backdrop).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!form.destination) next.destination = "Please choose a trip type.";
    if (!form.car) next.car = "Please choose a car.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (DEMO_MODE || !ENQUIRY_ENDPOINT) {
      // Nothing is transmitted. Say so instead of faking a success message.
      toast.info("Demo build — this enquiry was not sent.", {
        description:
          "The form is validated, but no mailbox is connected yet. Call +91 62640 18879 or tap “WhatsApp Us” in the footer to reach us for real.",
        duration: 7000,
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          passengers: form.passengers ? parseInt(form.passengers, 10) : null,
          travel_date: form.travel_date || null,
          message: form.message || null,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success("Enquiry sent! We'll call you back shortly.");
      setForm({ ...emptyForm });
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again or call us on +91 62640 18879.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#08090C]/85 backdrop-blur-md"
          onClick={onClose}
          data-testid="enquiry-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#111319] border border-white/10 p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              data-testid="enquiry-close-button"
              className="absolute top-5 right-5 text-slate-500 hover:text-[#E2A855] transition-colors duration-300"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#E2A855] mb-2">Plan Your Journey</p>
            <h3 id="enquiry-title" className="font-display font-bold uppercase tracking-tight text-2xl mb-8">
              Book Your Trip
            </h3>

            <form onSubmit={submit} className="space-y-4" data-testid="enquiry-form" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    required
                    placeholder="Your name"
                    aria-label="Your name"
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                    data-testid="enquiry-name-input"
                  />
                  {errors.name && <p className="mt-1 font-mono2 text-[10px] text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                    data-testid="enquiry-phone-input"
                  />
                  {errors.phone && <p className="mt-1 font-mono2 text-[10px] text-red-400">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select
                    required
                    aria-label="Trip type"
                    value={form.destination}
                    onChange={set("destination")}
                    className={inputCls}
                    data-testid="enquiry-destination-select"
                  >
                    <option value="" disabled>
                      Trip type
                    </option>
                    <option>Holidays</option>
                    <option>Road Trips</option>
                    <option>Beach Getaways</option>
                    <option>Hill Stations</option>
                    <option>Outstation</option>
                    <option>Corporate Travel</option>
                  </select>
                  {errors.destination && <p className="mt-1 font-mono2 text-[10px] text-red-400">{errors.destination}</p>}
                </div>
                <div>
                  <select
                    required
                    aria-label="Choose car"
                    value={form.car}
                    onChange={set("car")}
                    className={inputCls}
                    data-testid="enquiry-car-select"
                  >
                    <option value="" disabled>
                      Choose car
                    </option>
                    <option>Vitara Brezza</option>
                    <option>Grand Vitara</option>
                  </select>
                  {errors.car && <p className="mt-1 font-mono2 text-[10px] text-red-400">{errors.car}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  aria-label="Travel date"
                  value={form.travel_date}
                  onChange={set("travel_date")}
                  className={inputCls}
                  data-testid="enquiry-date-input"
                />
                <input
                  type="number"
                  min="1"
                  max="6"
                  placeholder="Passengers"
                  aria-label="Passengers"
                  value={form.passengers}
                  onChange={set("passengers")}
                  className={inputCls}
                  data-testid="enquiry-passengers-input"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Tell us about your trip (optional)"
                aria-label="Tell us about your trip"
                value={form.message}
                onChange={set("message")}
                className={inputCls}
                data-testid="enquiry-message-input"
              />
              <button
                type="submit"
                disabled={sending}
                data-testid="enquiry-submit-button"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#E2A855] text-[#08090C] font-mono2 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#F0B865] disabled:opacity-60 transition-colors duration-300"
              >
                {sending ? "Sending..." : "Send Enquiry"}
                <Send size={15} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
