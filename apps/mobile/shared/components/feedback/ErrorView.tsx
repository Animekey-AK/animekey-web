import { View, Text } from "react-native";
import { Button } from "@/shared/components/ui/Button";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({ message = "Something went wrong.", onRetry }: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-8">
      <Text className="text-white/70 text-base text-center">{message}</Text>
      {onRetry && <Button label="Try again" variant="secondary" onPress={onRetry} />}
    </View>
  );
}
