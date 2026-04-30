import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

type StatsProps = {
  total: number;
  completed: number;
  pending: number;
};

export default function StatsPanel({ total, completed, pending }: StatsProps) {
  return (
    <View
      className="mx-5 bg-white rounded-2xl flex-row"
      style={{
        marginTop: -20,
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <View className="flex-1 items-center py-4">
        <RemixIcon name="list-check" size={16} color="#6366f1" />
        <Text className="text-gray-900 text-xl font-bold mt-1">{total}</Text>
        <Text className="text-gray-400 text-xs">Total</Text>
      </View>

      <View className="w-px bg-gray-100 my-3" />

      <View className="flex-1 items-center py-4">
        <RemixIcon name="checkbox-circle-line" size={16} color="#6366f1" />
        <Text className="text-gray-900 text-xl font-bold mt-1">
          {completed}
        </Text>
        <Text className="text-gray-400 text-xs">Done</Text>
      </View>

      <View className="w-px bg-gray-100 my-3" />

      <View className="flex-1 items-center py-4">
        <RemixIcon name="time-line" size={16} color="#6366f1" />
        <Text className="text-gray-900 text-xl font-bold mt-1">{pending}</Text>
        <Text className="text-gray-400 text-xs">Pending</Text>
      </View>
    </View>
  );
}
