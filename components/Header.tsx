import { View, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function Header() {
  return (
    <View className="flex-row items-center pb-5 px-5 bg-white border-b border-gray-100 justify-between">
      <View className="flex-row items-center">
        <RemixIcon name="checkbox-multiple-line" size={28} color="#6366f1" />
        <Text className="text-gray-800 text-2xl font-bold ml-2">TaskFlow</Text>
      </View>
      <View>
        <Text>Final Project</Text>
        <Text>by: Mark John L. Milano</Text>
      </View>
    </View>
  );
}