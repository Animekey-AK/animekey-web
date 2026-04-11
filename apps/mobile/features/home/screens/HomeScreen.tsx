import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/shared/components/ui/Card";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Card
        title="Attack on Titan"
        subtitle="Shingeki no Kyojin"
        badge="New"
        progress={0.75}
      />
    </SafeAreaView>
  );
}
