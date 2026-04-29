import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <RemixIcon name="clipboard-line" size={64} color="#d1d5db" />
      <Text className="text-gray-700 text-xl font-bold mt-4 text-center">
        No Tasks Yet
      </Text>
      <Text className="text-gray-400 text-sm text-center mt-2 leading-5">
        Tap the input above and add your first task to get started!
      </Text>
    </View>
  );
}