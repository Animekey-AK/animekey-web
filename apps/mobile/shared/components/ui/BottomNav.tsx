import { View, Text, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import HomeIcon from "@/assets/icons/navbar/home.svg";
import HomeFilledIcon from "@/assets/icons/navbar/home-filled.svg";
import SearchIcon from "@/assets/icons/navbar/search.svg";
import SearchFilledIcon from "@/assets/icons/navbar/search-filled.svg";
import BookmarksIcon from "@/assets/icons/navbar/bookmarks.svg";
import BookmarksFilledIcon from "@/assets/icons/navbar/bookmarks-filled.svg";
import ProfileIcon from "@/assets/icons/navbar/profile.svg";
import ProfileFilledIcon from "@/assets/icons/navbar/profile-filled.svg";
import { palette } from "@/shared/constants/theme";

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TABS = [
  { key: "home", label: "Home", Icon: HomeIcon, FilledIcon: HomeFilledIcon },
  { key: "search", label: "Search", Icon: SearchIcon, FilledIcon: SearchFilledIcon },
  { key: "mylist", label: "My List", Icon: BookmarksIcon, FilledIcon: BookmarksFilledIcon },
  { key: "profile", label: "Profile", Icon: ProfileIcon, FilledIcon: ProfileFilledIcon },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BottomNav() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState<TabKey>("home");

  return (
    <View
      style={{
        backgroundColor: "#0F0F14",
        borderTopWidth: 1,
        borderTopColor: "#1E1E2A",
        paddingBottom: insets.bottom,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 20,
      }}
    >
      <View className="flex-row items-center">
        {TABS.map(({ key, label, Icon, FilledIcon }) => {
          const isActive = active === key;
          const color = isActive ? palette.brand : palette.textMuted;
          const TabIcon = isActive ? FilledIcon : Icon;

          return (
            <Pressable
              key={key}
              onPress={() => setActive(key)}
              android_ripple={{ color: "#E9456020", borderless: true }}
              className="flex-1 items-center py-3"
              style={({ pressed }) => ({
                opacity: pressed && Platform.OS === "ios" ? 0.7 : 1,
              })}
            >
              {/* Active indicator pill */}
              {isActive && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    width: 32,
                    height: 2,
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                    backgroundColor: palette.brand,
                  }}
                />
              )}

              {/* Icon with glow on active */}
              <View
                style={
                  isActive
                    ? {
                        shadowColor: palette.brand,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.7,
                        shadowRadius: 8,
                      }
                    : undefined
                }
              >
                <TabIcon width={22} height={22} color={color} />
              </View>

              {/* Label */}
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 10,
                  fontWeight: isActive ? "700" : "400",
                  letterSpacing: 0.4,
                  color,
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
