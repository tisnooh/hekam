'use client';

import { useMemo, useState } from 'react';
import { getAvailableDates } from '@/lib/data/delivery';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/Icon';

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

/** Calendrier sobre : seules les dates ouvertes existent. */
export default function DeliveryCalendar({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (iso: string) => void;
}) {
  const available = useMemo(() => new Set(getAvailableDates()), []);
  const [monthOffset, setMonthOffset] = useState(0);

  const today = useMemo(() => new Date(), []);
  const view = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthLabel = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(view);

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startPad = (first.getDay() + 6) % 7; // semaine commençant lundi
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const out: Array<string | null> = Array.from({ length: startPad }, () => null);
    for (let d = 1; d <= daysInMonth; d += 1) {
      out.push(new Date(view.getFullYear(), view.getMonth(), d).toISOString().slice(0, 10));
    }
    return out;
  }, [view]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
          disabled={monthOffset === 0}
          aria-label="Mois précédent"
          className="p-1.5 text-ivoire/50 transition-colors duration-500 hover:text-bronze-clair disabled:opacity-20"
        >
          <Icon name="chevronLeft" size={15} />
        </button>
        <p className="label !text-[9.5px] !text-ivoire/70 capitalize">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setMonthOffset((m) => Math.min(2, m + 1))}
          disabled={monthOffset === 2}
          aria-label="Mois suivant"
          className="p-1.5 text-ivoire/50 transition-colors duration-500 hover:text-bronze-clair disabled:opacity-20"
        >
          <Icon name="chevronRight" size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="py-2 font-sans text-[8.5px] uppercase tracking-[0.18em] text-ivoire/25">
            {d}
          </span>
        ))}
        {cells.map((iso, i) =>
          iso === null ? (
            <span key={`pad-${i}`} />
          ) : (
            <button
              key={iso}
              type="button"
              disabled={!available.has(iso)}
              onClick={() => onChange(iso)}
              aria-pressed={value === iso}
              aria-label={`Choisir le ${new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`))}`}
              className={cn(
                'mx-auto flex h-9 w-9 items-center justify-center text-[12.5px] transition-all duration-500 ease-luxe',
                value === iso
                  ? 'bg-bronze text-noir'
                  : available.has(iso)
                    ? 'text-ivoire/80 hover:bg-ivoire/[0.07]'
                    : 'text-ivoire/15',
              )}
            >
              {Number(iso.slice(8, 10))}
            </button>
          ),
        )}
      </div>

      <p className="mt-6 border-t border-ivoire/[0.09] pt-4 text-[11px] leading-relaxed text-ivoire/30">
        Atelier fermé le lundi. Les dates estompées sont complètes ou hors délai de
        fabrication (48 h minimum).
      </p>
    </div>
  );
}
