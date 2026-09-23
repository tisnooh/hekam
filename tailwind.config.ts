import type { Config } from 'tailwindcss';

/**
 * Design system H-EKAM OAT.
 * Le bronze reste une couleur d'accent (détails, états actifs, prix).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '430px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        noir: { DEFAULT: '#070707', soft: '#111111', lift: '#161310' },
        ivoire: '#F4EFE8',
        creme: '#EDE4DA',
        chaud: '#FAF8F5',
        bronze: { DEFAULT: '#A7793D', clair: '#C9A166', fonce: '#7A5628' },
        brun: '#382217',
        gris: '#9A9691',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.28em',
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        900: '900ms',
      },
    },
  },
  plugins: [],
};

export default config;
