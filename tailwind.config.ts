import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary : '#121212',
        yellow: '#F5C518',
        hover: '#dbad05',
        tertiary: '#5799EF',
        transparent: 'rgba(0,0,0,.6)',
        modalColor: '#136BC2'
      }
    },
    screens: {
      '2xl': '1115px',
      'xl':'1050px',
      'xl/1': '950px',
      'xl/2': '874px',
      'lg': '840px',
      'md': '800px',
      'sm': '650px',
      'xs':'450px'
    }
  },
  plugins: [],
}
export default config
