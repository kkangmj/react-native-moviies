import React, { useState } from "react";
import { Text, Image, useColorScheme, LogBox } from "react-native";
import Apploading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./theme";

LogBox.ignoreLogs(["Setting a timer"]);

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
  const loadImages = (images) =>
    images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.loadAsync(image);
      }
    });
  const startLoading = async () => {
    // count notification
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./me.jpg"),
      "https://i0.wp.com/st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-2.jpg?resize=640%2C1140&ssl=1",
    ]);
    await Promise.all([...fonts, ...images]);
  };

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return (
      <Apploading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
