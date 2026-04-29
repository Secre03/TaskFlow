import { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import StatsPanel from "../components/StatsPanel";
import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";
import BulkActions from "../components/BulkActions";
import EmptyState from "../components/EmptyState";

import { Task } from "../types/task";

const STORAGE_KEY = "taskflow_tasks";

export default function Index() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [inputText, setInputText] = useState("");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
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


  function addTask() {
    const trimmed = inputText.trim();

    if (!trimmed) {
      Alert.alert("Empty Task", "Please type something before adding.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(), 
      text: trimmed,
      completed: false,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    setInputText("");
  }

  function toggleTask(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }


  function deleteTask(id: string) {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  }


  function markAllComplete() {
    const updatedTasks = tasks.map((task) => ({ ...task, completed: true }));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }


  function deleteCompleted() {
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
      ]
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header />

        <StatsPanel total={total} completed={completed} pending={pending} />

        <AddTaskInput
          value={inputText}
          onChange={setInputText}
          onAdd={addTask}
        />

        {total > 0 && (
          <BulkActions
            onMarkAll={markAllComplete}
            onClearDone={deleteCompleted}
          />
        )}

    
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
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

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}