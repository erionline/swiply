module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": ["jotai/babel/plugin-react-refresh"]
  };
};
