/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // Se você usa o App Router (pasta 'app')
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    
    // Se você usa o Pages Router (pasta 'pages')
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
    
    // Se você tem uma pasta 'components'
    './components/**/*.{js,ts,jsx,tsx,mdx}', 
 
    // Se você usa uma pasta 'src' (descomente se for o caso)
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}