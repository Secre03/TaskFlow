// app/index.tsx
// ─────────────────────────────────────────────
// MAIN SCREEN — all app logic lives here.
//
// What this file does:
//   1. Wraps the whole screen in SafeAreaView
//      so content never goes behind the status
//      bar or the bottom navigation bar
//   2. Loads saved tasks from AsyncStorage when app opens
//   3. Saves tasks to AsyncStorage every time something changes
//   4. Handles: add, toggle, delete, mark all, clear completed
//   5. Passes data + functions down to components as props
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  View,
  FlatList,
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

// The key name used to store tasks in AsyncStorage
const STORAGE_KEY = "taskflow_tasks";

export default function Index() {

  // tasks = array of all task objects
  const [tasks, setTasks] = useState<Task[]>([]);

  // inputText = what the user is typing in the input box
  const [inputText, setInputText] = useState("");

  // ── Calculated stats (no extra state needed) ──
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;


  // ── Run once when app opens: load saved tasks ──
  useEffect(() => {
    loadTasks();
  }, []);


  // ── SAVE tasks to AsyncStorage ─────────────────
  // We convert the array to a JSON string to store it
  async function saveTasks(updatedTasks: Task[]) {
    try {
      const jsonString = JSON.stringify(updatedTasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    } catch (error) {
      console.log("Save error:", error);
    }
  }


  // ── LOAD tasks from AsyncStorage ───────────────
  // We parse the JSON string back into an array
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


  // ── ADD a new task ──────────────────────────────
  function addTask() {
    const trimmed = inputText.trim();

    // Block empty tasks
    if (!trimmed) {
      Alert.alert("Empty Task", "Please type something before adding.");
      return;
    }

    // Build the new task object
    const newTask: Task = {
      id: Date.now().toString(), // timestamp = simple unique ID
      text: trimmed,
      completed: false,
    };

    // Put new task at the top of the list
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    // Clear the input box
    setInputText("");
  }


  // ── TOGGLE a task done / undone ─────────────────
  function toggleTask(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // Flip completed to its opposite
        return { ...task, completed: !task.completed };
      }
      return task; // leave all other tasks unchanged
    });

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }


  // ── DELETE one task (with confirmation) ─────────
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
            // Keep every task except the one with this id
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  }


  // ── MARK ALL tasks as complete ──────────────────
  function markAllComplete() {
    const updatedTasks = tasks.map((task) => ({ ...task, completed: true }));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }


  // ── DELETE all completed tasks ──────────────────
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
            // Keep only the tasks that are NOT completed
            const updatedTasks = tasks.filter((task) => !task.completed);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  }


  // ── RENDER ──────────────────────────────────────
  return (
    // SafeAreaView automatically adds padding so content
    // stays away from the notch, status bar, and bottom bar
    <SafeAreaView className="flex-1 bg-gray-50">

      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        {/* App title */}
        <Header />

        {/* Stats: Total / Done / Pending */}
        <StatsPanel total={total} completed={completed} pending={pending} />

        {/* Input box to add tasks */}
        <AddTaskInput
          value={inputText}
          onChange={setInputText}
          onAdd={addTask}
        />

        {/* Bulk action buttons — only show when there are tasks */}
        {total > 0 && (
          <BulkActions
            onMarkAll={markAllComplete}
            onClearDone={deleteCompleted}
          />
        )}

        {/* Task list — FlatList handles scrolling efficiently */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
          // Show empty state when list is empty
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={total === 0 ? { flex: 1 } : { paddingBottom: 24 }}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}