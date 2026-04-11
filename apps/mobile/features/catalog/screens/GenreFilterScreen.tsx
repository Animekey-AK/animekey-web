import { View, Text } from "react-native";
import { Button } from "@/shared/components/ui/Button";
import { router } from "expo-router";

export default function GenreFilterScreen() {
  return (
    <View className="flex-1 bg-[#0F0F14] items-center justify-center px-6 gap-4">
      <Text className="text-white text-lg font-semibold">Filter by Genre</Text>
      <Button label="Apply" />
      <Button label="Cancel" variant="ghost" onPress={() => router.back()} />
    </View>
  );
}
