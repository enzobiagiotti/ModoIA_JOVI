/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:  '#0D1B3E',
        dark:  '#0A1020',
        brand: {
          DEFAULT: '#1A6BCC',
          light:   '#3B8FE8',
          pale:    '#D6E8FF',
        },
        surface: '#F4F7FC',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: 0, transform: 'translateX(50px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
        phoneFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        phoneBorder: {
          '0%,100%': { boxShadow: '0 0 10px rgba(59,143,232,0.4), 0 20px 60px rgba(0,0,0,0.5)' },
          '50%':     { boxShadow: '0 0 28px rgba(59,143,232,0.9), 0 20px 60px rgba(0,0,0,0.5)' },
        },
        scanLine: {
          '0%':   { top: '15%', opacity: 1 },
          '90%':  { top: '80%', opacity: 1 },
          '100%': { top: '80%', opacity: 0 },
        },
        blink: {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.3 },
        },
        chipPop: {
          '0%':   { opacity: 0, transform: 'translateX(-50%) translateY(-8px) scale(0.9)' },
          '20%':  { opacity: 1, transform: 'translateX(-50%) translateY(0) scale(1)' },
          '80%':  { opacity: 1, transform: 'translateX(-50%) translateY(0) scale(1)' },
          '100%': { opacity: 0, transform: 'translateX(-50%) translateY(-8px) scale(0.9)' },
        },
        shutterPulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.5)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(255,255,255,0)' },
        },
        gradShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        fadeUp:       'fadeUp 0.8s ease forwards',
        slideRight:   'slideRight 0.9s ease forwards',
        phoneFloat:   'phoneFloat 4s ease-in-out infinite',
        phoneBorder:  'phoneBorder 3s ease-in-out infinite',
        scanLine:     'scanLine 2.5s ease-in-out infinite',
        blink:        'blink 1.5s ease-in-out infinite',
        chipPop:      'chipPop 3s ease-in-out infinite',
        shutterPulse: 'shutterPulse 2s ease-in-out infinite',
        gradShift:    'gradShift 10s ease infinite',
      },
    },
  },
  plugins: [],
}
