// components/StatsPanel.tsx
// Shows Total, Done, and Pending counts

import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

type Props = {
  total: number;
  completed: number;
  pending: number;
};

export default function StatsPanel({ total, completed, pending }: Props) {
  return (
    <View className="flex-row mx-4 mt-4 mb-2 gap-2">

      {/* Total */}
      <View className="flex-1 items-center bg-gray-100 rounded-2xl py-3">
        <RemixIcon name="list-check" size={20} color="#6b7280" />
        <Text className="text-gray-800 text-xl font-bold mt-1">{total}</Text>
        <Text className="text-gray-500 text-xs">Total</Text>
      </View>

      {/* Done */}
      <View className="flex-1 items-center bg-green-50 rounded-2xl py-3">
        <RemixIcon name="checkbox-circle-line" size={20} color="#22c55e" />
        <Text className="text-green-600 text-xl font-bold mt-1">{completed}</Text>
        <Text className="text-gray-500 text-xs">Done</Text>
      </View>

      <View className="flex-1 items-center bg-orange-50 rounded-2xl py-3">
        <RemixIcon name="time-line" size={20} color="#f97316" />
        <Text className="text-orange-500 text-xl font-bold mt-1">{pending}</Text>
        <Text className="text-gray-500 text-xs">Pending</Text>
      </View>

    </View>
  );
}