/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  mode: 'all',
  purge: {
    content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  },
  theme: {
    extend: {},
  },
  content: [],
  plugins: [],
};
