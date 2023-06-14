module.exports = function(api) {
  api.cache(true);
  return {
    "presets": ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
      // [
      //   "@stripe/stripe-react-native",
      //   {
          
      //     "enableGooglePay": true
      //   }
      // ],
      "react-native-reanimated/plugin",
    ],
   
  };
};
