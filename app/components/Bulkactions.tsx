import { View, Text, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type Props = {
  onMarkAll: () => void;
  onClearDone: () => void;
};

export default function BulkActions({ onMarkAll, onClearDone }: Props) {
  return (
    <View className="flex-row mx-4 mb-3 gap-2">
      <TouchableOpacity
        onPress={onMarkAll}
        className="flex-1 flex-row items-center justify-center py-3 bg-green-50 border border-green-200 rounded-2xl"
        activeOpacity={0.7}
      >
        <RemixIcon name="check-double-line" size={16} color="#22c55e" />
        <Text className="text-green-600 text-xs font-semibold ml-1">
          Mark All Done
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClearDone}
        className="flex-1 flex-row items-center justify-center py-3 bg-red-50 border border-red-200 rounded-2xl"
        activeOpacity={0.7}
      >
        <RemixIcon name="delete-bin-2-line" size={16} color="#f87171" />
        <Text className="text-red-400 text-xs font-semibold ml-1">
          Clear Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
}
