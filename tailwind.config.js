/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'primary-orange': '#fa772c',
        'primary-blue': '#2847ef',
        
        // Category colors (light/dark pairs)
        'category-work': { light: '#f9dac5', dark: '#f9c075' },
        'category-health': { light: '#ddede3', dark: '#a8e2bb' },
        'category-personal': { light: '#cae9ef', dark: '#98e1ea' },
        'category-social': { light: '#e6e1f4', dark: '#c8bfef' },
        'category-creative': { light: '#f2d3d1', dark: '#f4b7ae' },
        'category-finance': { light: '#fef7d6', dark: '#f7e98e' },
        
        // Neutral colors
        background: '#fefbf7',
        'card-background': '#FFFFFF',
        'text-primary': '#4c4c4c',
        'text-secondary': '#a5a5a5',
        'border': '#e2e2e2',
      },
      backgroundColor: {
        'adhd-bg': '#fefbf7',
        'adhd-card': '#FFFFFF',
      },
      textColor: {
        'adhd-orange': '#fa772c',
        'adhd-blue': '#2847ef',
        'adhd-text': '#4c4c4c',
        'adhd-text-secondary': '#a5a5a5',
      },
      spacing: {
        'micro': '4px',
        'small': '8px',
        'medium': '16px',
        'large': '24px',
        'xlarge': '32px',
        'xxlarge': '48px',
        'massive': '64px',
      },
      borderRadius: {
        'small': '8px',
        'medium': '12px',
        'large': '16px',
        'pill': '20px',
        'circular': '999px',
      },
      fontSize: {
        'display-large': ['34px', { lineHeight: '1.2', fontWeight: '700' }],
        'title-medium': ['17px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-large': ['17px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-medium': ['15px', { lineHeight: '1.4', fontWeight: '500' }],
        'caption': ['12px', { lineHeight: '1.3', fontWeight: '500' }],
        'micro': ['10px', { lineHeight: '1.3', fontWeight: '500' }],
      },
      letterSpacing: {
        'display': '-0.5px',
        'caption': '0.25px',
      },
    },
  },
  plugins: [],
} 