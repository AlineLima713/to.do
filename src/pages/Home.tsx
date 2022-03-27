import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(taskName: string) {
    const wasAlreadyAdded = tasks.some((_task) => _task.title === taskName);

    if (wasAlreadyAdded) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const dataNewSkill = {
      id: new Date().getTime(),
      title: taskName,
      done: false,
      enable: false,
    }

    setTasks(oldState => [...oldState, dataNewSkill]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      } else {
        return task;
      }
    }))
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id !== id));
  }

  function handleEnableEditTask(id: number) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        return {
          ...task,
          enable: !task.enable
        }
      } else {
        return task;
      }
    }))
  }

  function handleEditTask(id: number, taskNewName: string) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title: taskNewName,
        }
      } else {
        return task;
      }
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        enableEditTask={handleEnableEditTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})