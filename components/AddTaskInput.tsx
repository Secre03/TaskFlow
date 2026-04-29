import { View, TextInput, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type Props = {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
};

export default function AddTaskInput({ value, onChange, onAdd }: Props) {
  const canAdd = value.trim().length > 0;

  return (
    <View className="flex-row items-center mx-4 mt-4 mb-2 bg-gray-100 rounded-2xl px-4 py-2">
      <RemixIcon name="pencil-line" size={18} color="#9ca3af" />

      <TextInput
        className="flex-1 text-gray-800 text-base px-3 py-2"
        placeholder="Add a new task..."
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      <TouchableOpacity
        onPress={onAdd}
        disabled={!canAdd}
        className={`p-2 rounded-xl ${canAdd ? "bg-indigo-500" : "bg-gray-300"}`}
        activeOpacity={0.8}
      >
        <RemixIcon name="add-line" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
