import { TestRunner } from 'expo-stories/shared/components/TestRunner';
import * as React from 'react';

export function ContactTests() {
  return <TestRunner selectedModules={[require('./ContactTests')]} />;
}

ContactTests.storyConfig = {
  name: 'Run Tests',
};

export default {
  title: 'Tests',
};
