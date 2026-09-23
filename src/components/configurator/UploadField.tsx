'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/**
 * Champ d'upload (logo, photo d'inspiration).
 * Démo frontend : le fichier reste local (aperçu via URL objet).
 * Phase 5 : remplacement par un upload Supabase Storage + stockage de l'URL.
 */
export default function UploadField({
  label,
  hint,
  fileName,
  onFile,
  accept = 'image/*',
}: {
  label: string;
  hint?: string;
  fileName: string | null;
  onFile: (name: string | null) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div>
      <p className="label mb-3 !text-ivoire/80">{label}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f.name);
        }}
        className={cn(
          'flex items-center gap-4 border border-dashed px-5 py-4 transition-colors duration-500',
          dragging ? 'border-bronze/60 bg-bronze/[0.04]' : 'border-ivoire/15 hover:border-ivoire/30',
        )}
      >
        <Icon name="upload" size={18} className="shrink-0 text-bronze" />
        <div className="min-w-0 flex-1">
          {fileName ? (
            <p className="truncate text-[13px] text-ivoire/85">{fileName}</p>
          ) : (
            <p className="text-[13px] text-ivoire/50">Glissez un fichier, ou</p>
          )}
          {hint && <p className="mt-1 text-[11px] text-ivoire/35">{hint}</p>}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="label shrink-0 border border-ivoire/25 px-4 py-2 transition-colors duration-400 hover:border-bronze hover:text-bronze-clair"
        >
          Parcourir
        </button>
        {fileName && (
          <button
            type="button"
            onClick={() => onFile(null)}
            aria-label={`Retirer ${fileName}`}
            className="shrink-0 text-ivoire/40 hover:text-bronze-clair"
          >
            <Icon name="close" size={14} />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          aria-label={label}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f.name);
          }}
        />
      </div>
    </div>
  );
}
