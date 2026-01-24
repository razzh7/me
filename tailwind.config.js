/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "65ch"
      }
    },
    colors: {
      background: 'hsl(var(--background))',
      hover: 'hsl(var(--hover))',
      hover2: 'hsl(var(--hover2))',
      icon: 'hsl(var(--icon))',
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      muted: 'hsl(var(--muted))',
      muted2: 'hsl(var(--muted2))',
      accent: 'hsl(var(--accent))',
      round: 'hsl(var(--round))',
      border: 'hsl(var(--border))',
      code: 'hsl(var(--code))',
      hightlight: 'hsl(var(--highlight))',
      block: 'hsl(var(--block))',
      link: 'hsl(var(--link))',
      badge: 'hsl(var(--badge))'
    },
    extend: {
      animation: {
        'fade-out': 'fadeOut 1s ease-in-out'
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
}

