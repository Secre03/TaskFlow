import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-10 py-16">
      <View className="items-center justify-center mb-6">
        <View className="bg-indigo-50 w-24 h-24 rounded-full items-center justify-center">
          <View className="bg-indigo-100 w-16 h-16 rounded-full items-center justify-center">
            <RemixIcon name="clipboard-line" size={32} color="#6366f1" />
          </View>
        </View>
      </View>

      <Text className="text-gray-800 text-xl font-bold text-center">
        All clear!
      </Text>
      <Text className="text-gray-400 text-sm text-center mt-2 leading-5">
        You have no tasks yet.{"\n"}Add one above to get started.
      </Text>
    </View>
  );
}
