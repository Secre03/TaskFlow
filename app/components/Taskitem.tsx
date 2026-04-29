import { View, Text, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View className="flex-row items-center mx-4 mb-2 px-4 py-4 bg-white rounded-2xl border border-gray-100">

      <TouchableOpacity onPress={() => onToggle(task.id)} activeOpacity={0.7}>
        <RemixIcon
          name={task.completed ? "checkbox-circle-fill" : "checkbox-blank-circle-line"}
          size={26}
          color={task.completed ? "#22c55e" : "#d1d5db"}
        />
      </TouchableOpacity>

      <Text
        className={`flex-1 text-base mx-3 ${
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
        numberOfLines={3}
      >
        {task.text}
      </Text>

      <TouchableOpacity onPress={() => onDelete(task.id)} activeOpacity={0.7}>
        <RemixIcon name="delete-bin-line" size={20} color="#f87171" />
      </TouchableOpacity>

    </View>
  );
}