// filepath: tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Asegúrate de incluir tus archivos
  theme: {
    extend: {
      backgroundImage: {
        
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'), // Agrega el plugin aquí
  ],
};