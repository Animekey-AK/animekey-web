import { View, Text } from "react-native";
import { Button } from "@/shared/components/ui/Button";
import { router } from "expo-router";

export default function SubscriptionScreen() {
  return (
    <View className="flex-1 bg-[#070707] items-center justify-center px-6 gap-4">
      <Text className="text-white text-2xl font-bold">Subscribe</Text>
      <Button label="See Plans" />
      <Button label="Dismiss" variant="ghost" onPress={() => router.back()} />
    </View>
  );
}
