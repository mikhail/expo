import * as React from 'react';
import { Text } from 'react-native';

export const MyDefaultStory = () => <Text>Add your stories here!</Text>;

MyDefaultStory.storyConfig = {
  name: 'My Default Story Name',
};

export default {
  title: 'Default story title',
};
