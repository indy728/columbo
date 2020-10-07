module.exports = {
  extends: 'airbnb',
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['', './src/'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
