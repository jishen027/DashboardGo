/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#1A1A1A',
          accent:  '#3B82F6',
        },
        surface: {
          bg:   '#FBFBF9',
          base: '#FFFFFF',
        },
        semantic: {
          success: '#10B981',
          warning: '#D97706',
          danger:  '#DC2626',
        },
        text: {
          secondary: '#8E918F',
          muted:     '#A8A29E',
        },
        border: {
          default: '#E5E7EB',
          subtle:  '#F3F4F6',
        },
      },
      boxShadow: {
        card:    '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.04)',
        hover:   '0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
        overlay: '0 10px 40px 0 rgba(0,0,0,0.14), 0 4px 12px -2px rgba(0,0,0,0.08)',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(30px,-50px) scale(1.1)' },
          '66%':      { transform: 'translate(-20px,20px) scale(0.9)' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.5s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'zoom-in':  'zoom-in 0.5s ease-out forwards',
        blob:       'blob 7s infinite',
      },
    },
  },
  plugins: [],
}
