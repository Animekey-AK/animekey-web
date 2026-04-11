import { View, Text } from "react-native";
import { Button } from "@/shared/components/ui/Button";
import { router } from "expo-router";

interface MovieDetailsScreenProps {
  id: string;
}

export default function MovieDetailsScreen({ id }: MovieDetailsScreenProps) {
  return (
    <View className="flex-1 bg-[#070707] items-center justify-center px-6 gap-4">
      <Text className="text-white/50 text-sm">Movie {id}</Text>
      <Button
        label="Watch Now"
        onPress={() => router.push(`/watch/${id}`)}
      />
    </View>
  );
}
