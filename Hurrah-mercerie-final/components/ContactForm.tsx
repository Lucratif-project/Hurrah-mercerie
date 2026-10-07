"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n/client";

export default function ContactForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError(t.contact.fillAll);
      return;
    }

    setError("");

    const text = [
      t.contact.wa.greeting,
      `${t.contact.wa.name} ${name}`,
      `${t.contact.wa.phone} ${phone}`,
      "",
      message,
    ].join("\n");

    window.open(buildWhatsAppLink(text), "_blank");
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-2xl border px-5 py-4"
        placeholder={t.contact.name}
      />

      <input
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-2xl border px-5 py-4"
        placeholder={t.contact.phone}
      />

      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-40 w-full rounded-2xl border px-5 py-4"
        placeholder={t.contact.message}
      />

      {error && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <button className="rounded-full bg-neutral-950 px-7 py-4 font-bold text-white hover:bg-orange-600">
        {t.contact.send}
      </button>
    </form>
  );
}
