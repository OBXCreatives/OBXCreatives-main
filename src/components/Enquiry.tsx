import { useEffect, useState, type FormEvent } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, dialCode, isValidPhone, toInternational } from "../lib/phone";
import { supabase } from "../lib/supabase";
import { INSTAGRAM_URL, SERVICES } from "../site";
import "./Enquiry.css";

type Kind = "contact" | "quote";
type Status = "idle" | "sending" | "sent" | "error";

const KINDS: { value: Kind; label: string }[] = [
  { value: "contact", label: "Contact" },
  { value: "quote", label: "Get a quote" },
];

// Match the column limits in the enquiries table so the browser stops overlong input first.
const MAX = { name: 200, email: 320, phone: 20, message: 5000 };

function kindFromHash(): Kind | null {
  if (window.location.hash === "#quote") return "quote";
  if (window.location.hash === "#contact") return "contact";
  return null;
}

export default function Enquiry() {
  const [kind, setKind] = useState<Kind>(() => kindFromHash() ?? "contact");
  const [status, setStatus] = useState<Status>("idle");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  // The CONTACT US and GET A QUOTE buttons link here; open the matching tab.
  useEffect(() => {
    const onHashChange = () => {
      const next = kindFromHash();
      if (next) setKind(next);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const clear = () => {
      form.reset();
      // reset() puts the controlled country select back to its first value; keep state in step.
      setCountry(DEFAULT_COUNTRY);
      setStatus("sent");
    };

    // Honeypot: the field is hidden from people, so only bots fill it. Pretend it worked.
    if (field("website")) {
      clear();
      return;
    }

    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const phone = toInternational(phoneInput.value, country);
    if (phone && !isValidPhone(phone)) {
      phoneInput.setCustomValidity("Enter a valid phone number, or leave it blank.");
      phoneInput.reportValidity();
      return;
    }

    if (!supabase) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const { error } = await supabase.from("enquiries").insert({
      kind,
      name: field("name"),
      email: field("email"),
      phone,
      service: kind === "quote" ? field("service") : null,
      message: field("message"),
    });

    if (error) {
      setStatus("error");
      return;
    }
    clear();
  }

  return (
    <section className="enquiry" id="contact" aria-labelledby="enquiry-title">
      <span id="quote" className="enquiry__anchor" aria-hidden="true" />
      <div className="container enquiry__grid">
        <div>
          <h2 className="enquiry__headline" id="enquiry-title">
            Let’s
            <br />
            talk
          </h2>
          <p className="enquiry__intro mono-sm">
            {kind === "quote"
              ? "Tell us about the project, timeline and budget. We reply with a quote."
              : "Questions, collaborations, commissions. We read every message."}
          </p>
        </div>

        <form className="enquiry__form" onSubmit={onSubmit}>
          <fieldset className="enquiry__kinds">
            <legend className="sr-only">Enquiry type</legend>
            {/* One pill; the solid thumb slides under whichever option is selected. */}
            <div className="enquiry__switch" data-selected={kind}>
              {KINDS.map((option) => (
                <label
                  key={option.value}
                  className={`enquiry__kind${kind === option.value ? " is-selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={option.value}
                    checked={kind === option.value}
                    onChange={() => setKind(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="enquiry__field">
            <span className="mono-sm">Name</span>
            <input name="name" type="text" autoComplete="name" maxLength={MAX.name} required />
          </label>

          <label className="enquiry__field">
            <span className="mono-sm">Email</span>
            <input name="email" type="email" autoComplete="email" maxLength={MAX.email} required />
          </label>

          <div className="enquiry__field">
            <label className="mono-sm" htmlFor="enquiry-phone">
              Phone <span className="enquiry__optional">(optional)</span>
            </label>
            <div className="enquiry__phone">
              {/* The native select sits invisibly over the +code so the closed state stays compact
                  while the open list shows full country names. */}
              <span className="enquiry__dial enquiry__chevron">
                <span aria-hidden="true">+{dialCode(country)}</span>
                <select
                  aria-label="Country code"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.iso}>
                      {c.name} (+{c.dial})
                    </option>
                  ))}
                </select>
              </span>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={MAX.phone}
                onInput={(event) => event.currentTarget.setCustomValidity("")}
              />
            </div>
          </div>

          {kind === "quote" && (
            <label className="enquiry__field">
              <span className="mono-sm">Service</span>
              <span className="enquiry__chevron">
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          )}

          <label className="enquiry__field">
            <span className="mono-sm">{kind === "quote" ? "Project details" : "Message"}</span>
            <textarea name="message" rows={5} maxLength={MAX.message} required />
          </label>

          <label className="enquiry__honeypot" aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>

          <div className="enquiry__actions">
            <button className="btn btn--solid enquiry__submit" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            <p className="enquiry__status mono-sm" role="status">
              {status === "sent" && "Thank you. We’ll be in touch soon."}
              {status === "error" && (
                <>
                  That didn’t send. Please try again, or message us on{" "}
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
