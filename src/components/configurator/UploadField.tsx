'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

const MAX_SIZE_MB = 5;

/**
 * Champ d'upload (photo d'inspiration, logo).
 * Démo frontend : le fichier reste local (nom conservé dans la configuration).
 * Phase 5 : upload Supabase Storage + URL persistée.
 * États gérés : vide, survol, succès (nom), erreur (type / poids).
 */
export default function UploadField({
  label,
  hint,
  fileName,
  onFile,
  accept = 'image/jpeg,image/png,image/webp',
}: {
  label: string;
  hint?: string;
  fileName: string | null;
  onFile: (name: string | null) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = (file: File | undefined | null) => {
    if (!file) return;
    const allowed = accept.split(',').some((t) => file.type === t.trim());
    if (!allowed) {
      setError('Format non accepté. Utilisez JPG, PNG ou WEBP.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Fichier trop lourd (${(file.size / 1024 / 1024).toFixed(1)} Mo). Maximum ${MAX_SIZE_MB} Mo.`);
      return;
    }
    setError(null);
    onFile(file.name);
  };

  return (
    <div>
      <p className="label mb-3 !text-[9.5px] !text-ivoire/70">{label}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          'flex items-center gap-4 border border-dashed px-5 py-4 transition-colors duration-500',
          dragging ? 'border-bronze/60 bg-bronze/[0.04]' : error ? 'border-[#7E2A33]' : 'border-ivoire/15 hover:border-ivoire/30',
        )}
      >
        <Icon name="upload" size={17} strokeWidth={0.9} className={cn('shrink-0', error ? 'text-[#C46A72]' : 'text-bronze')} />
        <div className="min-w-0 flex-1">
          {fileName ? (
            <p className="flex items-center gap-2 truncate text-[13px] text-ivoire/85">
              <Icon name="check" size={12} className="shrink-0 text-bronze" />
              {fileName}
            </p>
          ) : (
            <p className="text-[13px] text-ivoire/50">Glissez un fichier, ou</p>
          )}
          {hint && <p className="mt-1 text-[11px] text-ivoire/35">{hint}</p>}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="label shrink-0 border border-ivoire/25 px-4 py-2 transition-colors duration-500 hover:border-bronze hover:text-bronze-clair"
        >
          Parcourir
        </button>
        {fileName && (
          <button
            type="button"
            onClick={() => {
              onFile(null);
              setError(null);
            }}
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
            handle(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>
      {error && (
        <p className="mt-2.5 flex items-center gap-2 text-[11.5px] text-[#C46A72]" role="alert">
          <Icon name="info" size={12} />
          {error}
        </p>
      )}
    </div>
  );
}
