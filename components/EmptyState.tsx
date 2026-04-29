// components/EmptyState.tsx
// Minimal empty state — centered icon + text

import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-10 py-16">

      {/* Icon in a soft indigo circle */}
      <View className="w-20 h-20 rounded-full bg-indigo-50 items-center justify-center mb-5">
        <RemixIcon name="clipboard-line" size={36} color="#a5b4fc" />
      </View>

      <Text className="text-gray-800 text-lg font-bold text-center">
        No tasks yet
      </Text>

      <Text className="text-gray-400 text-sm text-center mt-2 leading-5">
        Add your first task above to get started.
      </Text>

    </View>
  );
}