import type { Metadata } from "next";
import { HomePage as HomepageView } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse AnimeKey's featured anime, trending series, and premium catalog highlights.",
};

export default function HomeRoute() {
  return <HomepageView />;
}
