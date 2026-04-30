import { View, TextInput, TouchableOpacity, Text } from "react-native";
import RemixIcon from "react-native-remix-icon";

type InputProps = {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
};

export default function AddTaskInput({ value, onChange, onAdd }: InputProps) {
  const canAdd = value.trim().length > 0;

  return (
    <View className="mx-5 mt-6 mb-2">
      <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2">
        New Task
      </Text>

      <View
        className="flex-row items-center bg-white rounded-2xl px-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <TextInput
          className="flex-1 text-gray-800 text-sm py-4"
          placeholder="What needs to be done?"
          placeholderTextColor="#c4c4c4"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />

        <TouchableOpacity
          onPress={onAdd}
          disabled={!canAdd}
          className={`ml-2 px-4 py-2 rounded-xl flex-row items-center gap-1 ${
            canAdd ? "bg-indigo-500" : "bg-gray-100"
          }`}
          activeOpacity={0.8}
        >
          <RemixIcon
            name="add-line"
            size={16}
            color={canAdd ? "white" : "#d1d5db"}
          />
          <Text
            className={`text-xs font-semibold ${canAdd ? "text-white" : "text-gray-300"}`}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
