import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function Header() {
  return (
    <View className="bg-indigo-500 px-6 pt-6 pb-8">

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <RemixIcon name="user-line" size={13} color="#c7d2fe" />  
          <Text className="text-indigo-200 text-xs">Mark John L. Milano</Text>
        </View>
        <View
          className="bg-indigo-400 px-3 py-1 rounded-full"
        >
          <Text className="text-indigo-100 text-xs font-medium">Final Project</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <View className="bg-white/20 p-2 rounded-xl">
          <RemixIcon name="checkbox-multiple-line" size={24} color="white" />
        </View>
        <View>
          <Text className="text-white text-3xl font-bold tracking-tight">TaskFlow</Text>
        </View>
      </View>

    </View>
  );
}