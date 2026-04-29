// app/index.tsx
// MAIN SCREEN — all app logic lives here.
//
// Instead of FlatList, we use ScrollView + tasks.map()
// which is easier to read and understand for beginners.

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

// All our components
import Header from "../components/Header";
import StatsPanel from "../components/StatsPanel";
import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";
import BulkActions from "../components/BulkActions";
import EmptyState from "../components/EmptyState";

// The Task type
import { Task } from "../types/task";

// The key used to save/load from AsyncStorage
const STORAGE_KEY = "taskflow_tasks";

export default function Index() {

  // tasks = the array of all task objects
  const [tasks, setTasks] = useState<Task[]>([]);

  // inputText = what the user is currently typing
  const [inputText, setInputText] = useState("");

  // Calculated stats — no extra state needed
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;


  // Run once when the app opens — load saved tasks
  useEffect(() => {
    loadTasks();
  }, []);


  // SAVE — convert array to JSON string and store it
  async function saveTasks(updatedTasks: Task[]) {
    try {
      const jsonString = JSON.stringify(updatedTasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    } catch (error) {
      console.log("Save error:", error);
    }
  }


  // LOAD — get JSON string and convert back to array
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


  // ADD a new task
  function addTask() {
    const trimmed = inputText.trim();

    // Stop if the input is empty
    if (!trimmed) {
      Alert.alert("Empty Task", "Please type something before adding.");
      return;
    }

    // Create the new task object
    const newTask: Task = {
      id: Date.now().toString(), // timestamp as simple unique ID
      text: trimmed,
      completed: false,
    };

    // Add to the top of the list
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    // Clear input box
    setInputText("");
  }


  // TOGGLE a task between done and not done
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


  // DELETE one task with a confirmation alert
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


  // MARK ALL tasks as complete
  function markAllComplete() {
    const updatedTasks = tasks.map((task) => ({ ...task, completed: true }));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }


  // DELETE all completed tasks
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


  // RENDER
  return (
    // SafeAreaView keeps content away from notch and bottom bar
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        {/* App title bar */}
        <Header />

        {/* Total / Done / Pending stats */}
        <StatsPanel total={total} completed={completed} pending={pending} />

        {/* Type and add new tasks here */}
        <AddTaskInput
          value={inputText}
          onChange={setInputText}
          onAdd={addTask}
        />

        {/* Bulk action buttons — only visible when tasks exist */}
        {total > 0 && (
          <BulkActions
            onMarkAll={markAllComplete}
            onClearDone={deleteCompleted}
          />
        )}

        {/* 
          ScrollView + tasks.map() is the beginner-friendly way
          to render a list. Each task becomes a TaskItem component.
        */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
        >

          {/* Show empty state when there are no tasks */}
          {tasks.length === 0 && <EmptyState />}

          {/* Render each task as a TaskItem */}
          {tasks.map((task) => (
            <TaskItem
              key={task.id}        // key is required by React for lists
              task={task}          // pass the task data
              onToggle={toggleTask} // pass the toggle function
              onDelete={deleteTask} // pass the delete function
            />
          ))}

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}