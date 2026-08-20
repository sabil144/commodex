import React, { useState } from "react";

// Rebuilt from the Base44 screenshot — replace with the real export.
const INTERESTS = [
  "Physical supply",
  "Offtake and origination",
  "Hedging and risk",
  "Partnership",
  "Institutional access",
];

const SUBJECTS = ["Energy", "Agriculture", "Metals", "The firm"];

const DESK = "info@commodex.au";

export default function InquiryPortal() {
  const [interest, setInterest] = useState("");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Equal, content-independent widths keep the sentence from reflowing as
  // options change length.
  const selectClass =
    "w-[11rem] max-w-full border-b border-border bg-transparent pb-1 font-display text-2xl text-accent outline-none transition-colors focus:border-accent sm:w-[13rem] sm:text-3xl";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!interest || !subject) {
      setError("Complete the statement before transmitting.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    // No backend on a coming-soon page — hand the statement to the visitor's mail client.
    const body = `Statement of interest\n\nI am interested in ${interest} regarding ${subject}.\n\nName: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${DESK}?subject=${encodeURIComponent(
      `Inquiry — ${subject}`
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="inquiry" className="relative z-10 border-t border-border px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono-label text-[10px] text-accent">§ Inquiry Portal</p>
        <h2 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
          Open a channel to the desk.
        </h2>

        <form className="mt-12 flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-4 font-display text-2xl leading-relaxed sm:text-3xl">
            <span>I am interested in</span>
            <label className="sr-only" htmlFor="interest">
              Area of interest
            </label>
            <select
              id="interest"
              className={selectClass}
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">— select —</option>
              {INTERESTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>regarding</span>
            <label className="sr-only" htmlFor="subject">
              Sector
            </label>
            <select
              id="subject"
              className={selectClass}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">— select —</option>
              {SUBJECTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>.</span>
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-mono-label text-[10px] text-muted-foreground" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="organization"
                placeholder="Director, institution, or firm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b border-border bg-transparent pb-2 font-body text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono-label text-[10px] text-muted-foreground" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@institution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-border bg-transparent pb-2 font-body text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              className="group inline-flex items-center gap-3 border border-border px-7 py-3 font-mono-label text-[11px] text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Transmit Statement
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>

            <p className="font-mono-label text-[10px] text-muted-foreground" role="status">
              {error || `Direct line — ${DESK}`}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
