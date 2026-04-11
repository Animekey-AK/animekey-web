import { View, Text } from "react-native";
import { Button } from "@/shared/components/ui/Button";
import { router } from "expo-router";

interface ShowDetailsScreenProps {
  id: string;
}

export default function ShowDetailsScreen({ id }: ShowDetailsScreenProps) {
  return (
    <View className="flex-1 bg-[#070707] items-center justify-center px-6 gap-4">
      <Text className="text-white/50 text-sm">Show {id}</Text>
      <Button
        label="Watch Now"
        onPress={() => router.push(`/watch/${id}`)}
      />
    </View>
  );
}
