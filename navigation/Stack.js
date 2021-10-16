import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Detail from "../screens/Detail";
import { COMMON, LIGHT, DARK } from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: isDark ? DARK.BLACK : "white",
        },
        headerTitleStyle: {
          color: isDark ? DARK.GRAY : LIGHT.PURPLE,
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
