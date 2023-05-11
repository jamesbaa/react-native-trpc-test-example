import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  useGetAllTodosQuery,
  useGetSpecificTodoQuery,
} from './services/todo.service';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const Root = () => {
  const {data} = useGetSpecificTodoQuery({id: 1});

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Root;
