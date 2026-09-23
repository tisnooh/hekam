/**
 * Icônes linéaires extrêmement fines (trait 1 px), dessinées pour la maison.
 * Aucune librairie externe, aucun emoji.
 */
const PATHS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 20 20" />
    </>
  ),
  bag: (
    <>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19c.9-3 2.9-4.6 5.5-4.6s4.6 1.6 5.5 4.6" />
      <path d="M15.5 6.6a3 3 0 0 1 0 5.4M17.5 14.9c1.6.7 2.6 2.1 3.1 4.1" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20h16M5 20v-6h14v6" />
      <path d="M5 14c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0 3-1.6 4.5 0" />
      <path d="M12 10V8" />
      <circle cx="12" cy="6.6" r="0.9" />
    </>
  ),
  leaf: (
    <>
      <path d="M19 5c-8 0-13 4-13 10 0 2 .8 4 .8 4S9 13 16 10c-5 3.4-7.6 6.6-8.4 9.4" />
      <path d="M19 5c0 8-4 12-10 12" />
    </>
  ),
  whisk: (
    <>
      <path d="M12 3v7" />
      <path d="M9 10c0 5 1.4 8 3 11 1.6-3 3-6 3-11" />
      <path d="M9 10h6M10 14h4" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8C10.6 8 10.6 5.6 12 4c1.4 1.6 1.4 4 0 5.8ZM14.2 12c1.8-1.4 4.2-1.4 5.8 0-1.6 1.4-4 1.4-5.8 0ZM12 14.2c1.4 1.8 1.4 4.2 0 5.8-1.4-1.6-1.4-4 0-5.8ZM9.8 12C8 13.4 5.6 13.4 4 12c1.6-1.4 4-1.4 5.8 0Z" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z" />
      <path d="M14.5 6.5l3 3" />
    </>
  ),
  truck: (
    <>
      <path d="M3 16V6h11v10" />
      <path d="M14 9h4l3 3v4h-3" />
      <circle cx="7.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
      <path d="M9.3 17.5h5.4M3 16h2.7" />
    </>
  ),
  store: (
    <>
      <path d="M4 10v10h16V10" />
      <path d="M3 10l2-5h14l2 5" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6" width="16" height="14" />
      <path d="M4 10h16M8 4v4M16 4v4" />
    </>
  ),
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  chevronLeft: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  chevronRight: <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="M5 12.5 10 17.5 19 7" />,
  upload: (
    <>
      <path d="M12 16V5m-4.5 4.5L12 5l4.5 4.5" />
      <path d="M5 16v3h14v-3" />
    </>
  ),
  rotate: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </>
  ),
  diamond: <path d="M12 4l7 8-7 8-7-8z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.4" />
    </>
  ),
};

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
