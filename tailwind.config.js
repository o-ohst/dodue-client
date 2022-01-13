
module.exports = {
  content: [
    "./src/*.tsx",
    "./src/components/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        questrial: ['Questrial', 'sans'],
        notosans: ['Noto Sans', 'sans-serif']
      },
      colors: {
        'primary': '#7B9CA7',
        'secondary': '#D3B9CC',
        'secondaryHover': '#9c8997',
        'background': '#E5E5E5',
      }
    }
  },
  plugins: [require('@tailwindcss/forms'),],
}
