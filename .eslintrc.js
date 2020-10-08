module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
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
