import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(taskName: string) {
    const dataNewSkill = {
      id: new Date().getTime(),
      title: taskName,
      done: false
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

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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