module.exports = {
  env: {
    es2022: true,
    'react-native/react-native': true,
  },
  extends: ['universe', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2023',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native'],
  rules: {
    // ignore errors :
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/ignore': ['react-native'],
  },
  ignorePatterns: ['babel.config.js', 'node_modules/', '.git/'],
};
