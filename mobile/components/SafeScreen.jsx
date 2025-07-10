import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStore } from "@/store/themeStore"; // ✅ thème dynamique

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ récupération du thème

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: COLORS.background, // ✅ fond dynamique
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
