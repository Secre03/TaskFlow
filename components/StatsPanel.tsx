// components/StatsPanel.tsx
// 3 stat cards — white cards with soft shadow

import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

type Props = {
  total: number;
  completed: number;
  pending: number;
};

export default function StatsPanel({ total, completed, pending }: Props) {
  return (
    <View className="flex-row mx-5 mt-5 mb-2 gap-3">

      {/* Total */}
      <View
        className="flex-1 items-center bg-white rounded-2xl py-4"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}
      >
        <RemixIcon name="list-check" size={18} color="#6366f1" />
        <Text className="text-gray-900 text-2xl font-bold mt-1">{total}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Total</Text>
      </View>

      {/* Done */}
      <View
        className="flex-1 items-center bg-white rounded-2xl py-4"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}
      >
        <RemixIcon name="checkbox-circle-line" size={18} color="#6366f1" />
        <Text className="text-gray-900 text-2xl font-bold mt-1">{completed}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Done</Text>
      </View>

      {/* Pending */}
      <View
        className="flex-1 items-center bg-white rounded-2xl py-4"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}
      >
        <RemixIcon name="time-line" size={18} color="#6366f1" />
        <Text className="text-gray-900 text-2xl font-bold mt-1">{pending}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Pending</Text>
      </View>

    </View>
  );
}