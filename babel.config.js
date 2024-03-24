module.exports = {
  presets: ['module:@react-native/babel-preset'],
// this is the updated plugins
  plugins: [
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
      
    },
  },
};
