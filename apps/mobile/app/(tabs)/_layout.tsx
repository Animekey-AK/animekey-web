import { Stack } from "expo-router";
import { View } from "react-native";
import BottomNav from "@/shared/components/ui/BottomNav";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#070707" },
          animation: "fade",
        }}
      />
      <BottomNav />
    </View>
  );
}
