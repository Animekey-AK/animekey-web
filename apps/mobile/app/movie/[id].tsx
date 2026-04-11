import { useLocalSearchParams } from "expo-router";
import MovieDetailsScreen from "@/features/title/screens/MovieDetailsScreen";

export default function MovieRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <MovieDetailsScreen id={id} />;
}
