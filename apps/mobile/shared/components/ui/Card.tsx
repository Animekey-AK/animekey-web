import { Image, Text, View } from "react-native";

interface CardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  progress?: number; // 0–1
}

export function Card({ title, subtitle, badge, progress }: CardProps) {
  return (
    <View className="bg-surface-raised rounded-2xl overflow-hidden border border-white/8">
      {/* Thumbnail placeholder */}
      <View className="w-full h-40 bg-surface-overlay">
        <Image
          source={require("../../../assets/images/thumbnail.jpg")}
          className="w-full h-full"
          resizeMode="cover"
        />
        {badge && (
          <View className="absolute top-2 right-2 bg-brand px-1.5 py-0.5 rounded">
            <Text className="text-black text-xs font-bold">{badge}</Text>
          </View>
        )}
      </View>

      {/* Progress bar */}
      {progress !== undefined && (
        <View className="h-0.5 bg-white/10">
          <View
            className="h-full bg-brand"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </View>
      )}

      {/* Meta */}
      <View className="px-4 py-3 gap-0.5">
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-white/50 text-sm" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}
