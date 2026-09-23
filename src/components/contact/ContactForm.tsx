'use client';

/** Formulaire de contact — démo frontend (envoi réel en phase 5). */
export default function ContactForm() {
  return (
    <form className="mt-14 max-w-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label mb-2 block">Nom</span>
          <input className="w-full border-b border-ivoire/20 bg-transparent pb-3 text-[15px] text-ivoire focus:border-bronze focus:outline-none" />
        </label>
        <label className="block">
          <span className="label mb-2 block">Email</span>
          <input type="email" className="w-full border-b border-ivoire/20 bg-transparent pb-3 text-[15px] text-ivoire focus:border-bronze focus:outline-none" />
        </label>
      </div>
      <label className="block">
        <span className="label mb-2 block">Votre message</span>
        <textarea rows={5} className="w-full resize-none border border-ivoire/15 bg-transparent p-4 text-[14px] leading-relaxed text-ivoire focus:border-bronze focus:outline-none" />
      </label>
      <button type="submit" className="btn-primary">
        Envoyer
      </button>
    </form>
  );
}
