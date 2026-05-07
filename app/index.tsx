import { useState, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import TaskStatistics from "../components/TaskStatistics";
import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";
import TaskActions from "../components/TaskActions";
import EmptyState from "../components/EmptyState";

import { Task } from "../types/task";

const STORAGE_KEY = "tasks";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  useEffect(() => {
    loadTasks();
  }, []);

  async function saveTasks(updatedTasks: Task[]) {
    try {
      const jsonString = JSON.stringify(updatedTasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    } catch (error) {
      console.log("Save error:", error);
    }
  }

  async function loadTasks() {
    try {
      const jsonString = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonString !== null) {
        const savedTasks: Task[] = JSON.parse(jsonString);
        setTasks(savedTasks);
      }
    } catch (error) {
      console.log("Load error:", error);
    }
  }

  const addTask = () => {
    const taskId = Date.now().toString();
    if (!inputText) {
      Alert.alert("Empty Task", "Please type something before adding.");
      return;
    }
    const newTask: Task = {
      id: taskId,
      text: inputText,
      completed: false,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setInputText("");
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const markAllComplete = () => {
    if (pending === 0) {
      Alert.alert("All Done", "All tasks are already completed.");
      return;
    }
    Alert.alert(
      "Mark All Complete",
      `Mark all ${pending} pending task(s) as done?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark All",
          onPress: () => {
            const updatedTasks = tasks.map((task) => ({
              ...task,
              completed: true,
            }));
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ],
    );
  };

  const deleteCompleted = () => {
    if (completed === 0) {
      Alert.alert("Nothing to clear", "There are no completed tasks.");
      return;
    }
    Alert.alert(
      "Clear Completed",
      `Remove all ${completed} completed task(s)?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => !task.completed);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <Header />

      <TaskStatistics total={total} completed={completed} pending={pending} />

      <AddTaskInput value={inputText} onChange={setInputText} onAdd={addTask} />

      {total > 0 && (
        <TaskActions
          onMarkAll={markAllComplete}
          onClearDone={deleteCompleted}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: 32,
          flexGrow: 1,
        }}
      >
        {tasks.length === 0 && <EmptyState />}

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
