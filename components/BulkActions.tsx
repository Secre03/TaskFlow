import { View, Text, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type ActionProps = {
  onMarkAll: () => void;
  onClearDone: () => void;
};

export default function BulkActions({ onMarkAll, onClearDone }: ActionProps) {
  return (
    <View className="flex-row items-center justify-between mx-5 mt-4 mb-1">
      <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
        My Tasks
      </Text>

      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={onMarkAll}
          className="flex-row items-center gap-1"
          activeOpacity={0.7}
        >
          <RemixIcon name="check-double-line" size={14} color="#6366f1" />
          <Text className="text-indigo-500 text-xs font-medium">All done</Text>
        </TouchableOpacity>

        <Text className="text-gray-300">·</Text>

        <TouchableOpacity
          onPress={onClearDone}
          className="flex-row items-center gap-1"
          activeOpacity={0.7}
        >
          <RemixIcon name="delete-bin-line" size={14} color="#9ca3af" />
          <Text className="text-gray-400 text-xs font-medium">Clear done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
