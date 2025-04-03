/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"], // Asegura que Tailwind escanea los archivos correctos
  theme: {
    extend: {
      colors: {
        'dark-bg': '#2D2D2D',  // Gris oscuro para el modo oscuro
        'dark-text': '#E5E5E5', // Gris claro para texto en el modo oscuro
        'light-bg': '#FFFFFF',  // Blanco para el modo claro
        'light-text': '#1A1A1A', // Gris oscuro para texto en el modo claro
      }
    },
  },
  plugins: [],
};


