import React, { useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Task } from './TasksList'

import penIcon from '../assets/icons/pen/pen.png'
import trashIcon from '../assets/icons/trash/trash.png'


interface TaskItemProps {
  editTask: (id: number, taskNewName: string) => void;
  enableEditTask: (id: number) => void;
  removeTask: (id: number) => void;
  task: Task;
}

export function TaskItem({ editTask, task, enableEditTask, removeTask }: TaskItemProps) {
  const [taskNewName, setTaskNewName] = useState(task.title);

  const editFieldRef = useRef<any>(null);

  // useEffect(() => {
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
  //     console.log(task.enable)


  //       enableEditTask(task.id);

  //   });

  //   return () => {
  //     hideSubscription.remove();
  //   };
  // }, []);

  return (
    <>
      <TextInput
        style={task.done ? styles.taskTextDone : styles.taskText}
        ref={editFieldRef}
        editable={task.enable}
        value={taskNewName}
        onChangeText={setTaskNewName}
        onSubmitEditing={() => {
          enableEditTask(task.id);
          editTask(task.id, taskNewName);
        }}
      />

      {
        !task.enable && (
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() => {
              enableEditTask(task.id);
              setTimeout(() => {
                editFieldRef?.current?.focus();
              });
            }}
          >
            <Image
              source={penIcon}
            />
          </TouchableOpacity>
        )
      }

      {
        task.enable && (
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() => {
              enableEditTask(task.id);
              setTaskNewName(task.title);
            }}
          >
            <Icon
              name="close"
              color="#bdb7b7"
              size={24}
            />
          </TouchableOpacity>
        )
      }

      <TouchableOpacity
        style={{ padding: 24 }}
        disabled={task.enable}
        onPress={() => {
          Alert.alert(
            "Remover item",
            "Tem certeza que você deseja remover esse item?",
            [
              {
                text: "NÃO",
                style: "cancel"
              },

              {
                text: "SIM",
                onPress: () => removeTask(task.id),
                style: "destructive"
              }
            ]
          );

        }}
      >
        <Image source={trashIcon} style={{ opacity: task.enable ? 0.2 : 1 }} />
      </TouchableOpacity>
    </>
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
  },
  taskButton: {
    paddingLeft: 24,
    paddingRight: 10,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
})