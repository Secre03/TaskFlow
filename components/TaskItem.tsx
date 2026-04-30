import { View, Text, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";
import { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View
      className="flex-row items-center mx-5 mb-3 bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View
        className={`w-1 self-stretch rounded-l-2xl ${
          task.completed ? "bg-gray-100" : "bg-indigo-500"
        }`}
      />

      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        className="pl-4 pr-2 py-4"
        activeOpacity={0.7}
      >
        <RemixIcon
          name={
            task.completed
              ? "checkbox-circle-fill"
              : "checkbox-blank-circle-line"
          }
          size={22}
          color={task.completed ? "#a5b4fc" : "#6366f1"}
        />
      </TouchableOpacity>

      <Text
        className={`flex-1 text-sm py-4 pr-2 ${
          task.completed ? "line-through text-gray-300" : "text-gray-700"
        }`}
        numberOfLines={3}
      >
        {task.text}
      </Text>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        className="px-4 py-4"
        activeOpacity={0.7}
      >
        <RemixIcon name="delete-bin-line" size={17} color="#fb6060" />
      </TouchableOpacity>
    </View>
  );
}
