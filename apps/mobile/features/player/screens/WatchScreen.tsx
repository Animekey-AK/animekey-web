import { View, Text } from "react-native";

interface WatchScreenProps {
  id: string;
}

export default function WatchScreen({ id }: WatchScreenProps) {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-white/50 text-sm">Playing {id}</Text>
    </View>
  );
}
