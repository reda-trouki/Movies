import "dotenv/config";

export default {
  expo: {
    name: "movies",
    slug: "movies",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/movies-logo.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    scheme: "myapp",
    extra: {
      tmdbKey: process.env.TMDB_API_KEY,
      // apiKey: process.env.EXPO_PUBLIC_API_KEY,
      // debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE,
    },
  },
};
