/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        // Brand: refined sage as the single accent
        sage: {
          DEFAULT: '#3D5A3D',
          50:  '#F1F4EE',
          100: '#DCE5D6',
          200: '#B9C9AD',
          300: '#94AD85',
          400: '#6E8C5F',
          500: '#3D5A3D',
          600: '#324832',
          700: '#283628',
          800: '#1D261D',
          900: '#121712',
        },
        // Editorial neutrals
        ink: {
          DEFAULT: '#0F0E0C',
          50:  '#F5F4F1',
          100: '#E8E6E1',
          200: '#CFCCC5',
          300: '#B0ACA3',
          400: '#8A867D',
          500: '#5E5B54',
          600: '#3F3D38',
          700: '#2A2825',
          800: '#1A1917',
          900: '#0F0E0C',
        },
        cream: {
          DEFAULT: '#FAF8F4',
          50:  '#FFFEFB',
          100: '#FAF8F4',
          200: '#F1EEE6',
          300: '#E4E0D4',
        },
        clay: {
          DEFAULT: '#C8A786',
          50:  '#FAF4EC',
          100: '#F2E5D3',
          200: '#E5CDA8',
          300: '#D8B58C',
          400: '#C8A786',
          500: '#B08E63',
          600: '#8C704A',
          700: '#5E4A30',
        },
        muted: '#8A867D',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Noto Serif SC', 'serif'],
        sans: ['Inter', 'Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'DIN Alternate', 'ui-monospace', 'monospace'],
        display: ['Cormorant Garamond', 'Noto Serif SC', 'serif'],
      },
      fontSize: {
        // Editorial scale — matching day1cj massiveness
        'display-2xl': ['clamp(3.5rem, 9vw, 7rem)',  { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-xl':  ['clamp(2.75rem, 6vw, 5rem)',  { lineHeight: '1',    letterSpacing: '-0.035em', fontWeight: '900' }],
        'display-lg':  ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '800' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.25rem)',{ lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        'eyebrow':     ['0.75rem', { lineHeight: '1', letterSpacing: '0.3em', fontWeight: '600' }],
      },
      animation: {
        'fade-in':     'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up':    'slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in':    'slideIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in':    'scaleIn 0.4s ease-out forwards',
        'marquee':     'marquee 60s linear infinite',
        'blink':       'blink 1.6s ease-in-out infinite',
        'pulse-soft':  'pulseSoft 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      borderRadius: {
        'pill': '9999px',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'wider-2': '0.2em',
        'widest-2': '0.3em',
      },
    },
  },
  plugins: [],
};