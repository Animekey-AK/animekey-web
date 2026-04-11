import { useLocalSearchParams } from "expo-router";
import WatchScreen from "@/features/player/screens/WatchScreen";

export default function WatchRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <WatchScreen id={id} />;
}
