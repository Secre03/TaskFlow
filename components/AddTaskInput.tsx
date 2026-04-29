// components/AddTaskInput.tsx
// Clean input bar with indigo add button

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
    <View
      className="flex-row items-center mx-5 mt-4 mb-3 bg-white rounded-2xl px-4"
      style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}
    >
      {/* Pencil icon */}
      <RemixIcon name="pencil-line" size={16} color="#a5b4fc" />

      {/* Text input */}
      <TextInput
        className="flex-1 text-gray-800 text-sm px-3 py-4"
        placeholder="Add a new task..."
        placeholderTextColor="#c4c4c4"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      {/* Add button */}
      <TouchableOpacity
        onPress={onAdd}
        disabled={!canAdd}
        className={`p-2 rounded-xl ${canAdd ? "bg-indigo-500" : "bg-gray-100"}`}
        activeOpacity={0.8}
      >
        <RemixIcon name="add-line" size={18} color={canAdd ? "white" : "#d1d5db"} />
      </TouchableOpacity>

    </View>
  );
}