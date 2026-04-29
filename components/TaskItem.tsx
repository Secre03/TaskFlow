// components/TaskItem.tsx
// Clean task row with soft shadow — 2 colors only (gray + indigo)

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
    <View
      className="flex-row items-center mx-5 mb-3 px-4 py-4 bg-white rounded-2xl"
      style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
    >
      {/* Checkbox */}
      <TouchableOpacity onPress={() => onToggle(task.id)} activeOpacity={0.7}>
        <RemixIcon
          name={task.completed ? "checkbox-circle-fill" : "checkbox-blank-circle-line"}
          size={24}
          color={task.completed ? "#6366f1" : "#e5e7eb"}
        />
      </TouchableOpacity>

      {/* Task text */}
      <Text
        className={`flex-1 text-sm mx-3 ${
          task.completed
            ? "line-through text-gray-300"  // faded when done
            : "text-gray-800"               // normal
        }`}
        numberOfLines={3}
      >
        {task.text}
      </Text>

      {/* Delete button */}
      <TouchableOpacity onPress={() => onDelete(task.id)} activeOpacity={0.7}>
        <RemixIcon name="delete-bin-line" size={18} color="#e5e7eb" />
      </TouchableOpacity>

    </View>
  );
}