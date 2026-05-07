import { View, TextInput, Text, Pressable } from "react-native";
import RemixIcon from "react-native-remix-icon";

type InputProps = {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
};

const AddTaskInput = ({ value, onChange, onAdd }: InputProps) => {
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

        <Pressable
          onPress={onAdd}
          className="ml-2 px-4 py-2 rounded-xl flex-row items-center gap-1 bg-indigo-500"
        >
          <RemixIcon name="add-line" size={16} color="white" />
          <Text className="text-white text-xs font-semibold">Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddTaskInput;
