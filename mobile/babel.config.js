module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // ou ['metro-react-native-babel-preset'] si tu n'utilises pas Expo
  };
};
