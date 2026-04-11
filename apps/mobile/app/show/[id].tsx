import { useLocalSearchParams } from "expo-router";
import ShowDetailsScreen from "@/features/title/screens/ShowDetailsScreen";

export default function ShowRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ShowDetailsScreen id={id} />;
}
