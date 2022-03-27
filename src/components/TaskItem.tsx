import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { Task } from './TasksList'

interface TaskItemProps {
  editTask: (id: number, taskNewName: string) => void;
  enableEditTask: (id: number) => void;
  task: Task;
}

export function TaskItem({ editTask, task, enableEditTask }: TaskItemProps) {
  const [taskNewName, setTaskNewName] = useState(task.title);

  return (
    <TextInput
      style={task.done ? styles.taskTextDone : styles.taskText}
      editable={task.enable}
      value={taskNewName}
      onChangeText={(text) => setTaskNewName(text)}
      onSubmitEditing={() => {
        enableEditTask(task.id)
        editTask(task.id, taskNewName)
      }}
    />
  )
}

const styles = StyleSheet.create({
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    flex: 1
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    flex: 1
  }
})