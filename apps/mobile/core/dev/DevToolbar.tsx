import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDevMode } from "@/core/dev/DevModeContext";

export function DevToolbar() {
  const { mockApi, toggleMockApi } = useDevMode();
  const [expanded, setExpanded] = useState(false);

  if (!__DEV__) return null;

  if (!expanded) {
    return (
      <Pressable
        className="absolute bottom-28 right-4 z-50 h-10 w-10 items-center justify-center rounded-full bg-yellow-500"
        onPress={() => setExpanded(true)}
        hitSlop={8}
      >
        <Text className="text-[14px] font-black text-black">D</Text>
      </Pressable>
    );
  }

  return (
    <View className="absolute bottom-28 right-4 z-50 rounded-2xl border border-white/20 bg-[#1a1a1a] p-3">
      <View className="mb-2 flex-row items-center justify-between gap-4">
        <Text className="text-[13px] font-bold text-white">Dev Tools</Text>
        <Pressable onPress={() => setExpanded(false)}>
          <Text className="text-[13px] text-white/50">X</Text>
        </Pressable>
      </View>

      <Pressable
        className="flex-row items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5"
        onPress={toggleMockApi}
      >
        <View
          className={
            mockApi
              ? "h-4 w-4 rounded-full bg-yellow-500"
              : "h-4 w-4 rounded-full border border-white/30 bg-transparent"
          }
        />
        <Text className="text-[13px] text-white">
          Mock API {mockApi ? "ON" : "OFF"}
        </Text>
      </Pressable>
    </View>
  );
}
