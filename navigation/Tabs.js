import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { COMMON, LIGHT, DARK } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      initialRouteName="Movies"
      sceneContainerStyle={{
        backgroundColor: isDark ? DARK.BLACK : "white",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? DARK.BLACK : "white",
        },
        tabBarActiveTintColor: isDark ? DARK.YELLOW : LIGHT.PURPLE,
        tabBarInactiveTintColor: isDark ? DARK.GRAY : LIGHT.GRAY,
        tabBarLabelStyle: {
          fontWeight: "bold",
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        headerStyle: {
          backgroundColor: isDark ? DARK.BLACK : "white",
        },
        headerTitleStyle: {
          color: isDark ? DARK.GRAY : LIGHT.PURPLE,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarBadge: "3",
          tabBarBadgeStyle: {
            backgroundColor: COMMON.RED,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
