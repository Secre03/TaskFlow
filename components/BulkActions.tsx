// components/BulkActions.tsx
// Two minimal outlined buttons

import { View, Text, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type Props = {
  onMarkAll: () => void;
  onClearDone: () => void;
};

export default function BulkActions({ onMarkAll, onClearDone }: Props) {
  return (
    <View className="flex-row mx-5 mb-4 gap-3">

      {/* Mark All Done — indigo outline */}
      <TouchableOpacity
        onPress={onMarkAll}
        className="flex-1 flex-row items-center justify-center py-3 bg-white border border-indigo-200 rounded-2xl"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
        activeOpacity={0.7}
      >
        <RemixIcon name="check-double-line" size={15} color="#6366f1" />
        <Text className="text-indigo-500 text-xs font-semibold ml-1.5">Mark All Done</Text>
      </TouchableOpacity>

      {/* Clear Completed — gray outline */}
      <TouchableOpacity
        onPress={onClearDone}
        className="flex-1 flex-row items-center justify-center py-3 bg-white border border-gray-200 rounded-2xl"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
        activeOpacity={0.7}
      >
        <RemixIcon name="delete-bin-2-line" size={15} color="#9ca3af" />
        <Text className="text-gray-400 text-xs font-semibold ml-1.5">Clear Completed</Text>
      </TouchableOpacity>

    </View>
  );
}