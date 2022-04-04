import React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import { TaskItem } from './TaskItem';


export interface Task {
  id: number;
  title: string;
  done: boolean;
  enable: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  enableEditTask: (id: number) => void;
  editTask: (id: number, taskNewName: string) => void;

}

export function TasksList({ tasks, toggleTaskDone, enableEditTask, editTask, removeTask }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      style={{
        marginTop: 32
      }}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              
              <TouchableOpacity
                testID={`button-${index}`}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  {item.done && (
                    <Icon
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TaskItem
                enableEditTask={enableEditTask}
                task={item}
                editTask={editTask}
                removeTask={removeTask}
              />

            </View>
          </ItemWrapper >
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  taskButton: {
    paddingLeft: 24,
    paddingRight: 10,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    alignItems: 'center',
    justifyContent: 'center',

  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    alignItems: 'center',
    justifyContent: 'center'
  },

})