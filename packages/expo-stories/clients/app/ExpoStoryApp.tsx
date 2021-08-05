import { lightTheme, shadows, spacing } from '@expo/styleguide-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, SafeAreaView, Pressable, Text, StyleSheet, ScrollView } from 'react-native';

// this is resolved via customization (extraNodeModules) in metro-config / webpack-config
const stories = require('generated-expo-stories');

// aggregate stories
const storyData = {};

Object.keys(stories).forEach(key => {
  const story = stories[key];
  const storyConfig = story.storyConfig;
  const parentConfig = story.parentConfig;

  if (!storyData[parentConfig.id]) {
    storyData[parentConfig.id] = {
      ...parentConfig,
      stories: [],
    };
  }

  storyData[parentConfig.id].stories.push(storyConfig);
});

const RNStack = createStackNavigator();

export default function App({ title = '' }) {
  return (
    <NavigationContainer>
      <ExpoStoryApp title={title} />
    </NavigationContainer>
  );
}

function ExpoStoryApp({ title = '' }) {
  const parentStoryIds = Object.keys(storyData);

  return (
    <RNStack.Navigator>
      {parentStoryIds.length > 1 && (
        <RNStack.Screen name="Home" component={Home} options={{ title }} />
      )}
      <RNStack.Screen
        name="Selected Stories"
        component={SelectedStories}
        options={({ route }) => {
          return {
            title: route.params?.title || '',
          };
        }}
        initialParams={{
          title: parentStoryIds.length === 1 ? storyData[parentStoryIds[0]].title : '',
          parentStoryId: parentStoryIds.length === 1 ? parentStoryIds[0] : undefined,
        }}
      />
      <RNStack.Screen
        name="Stories Detail"
        component={StoriesDetail}
        options={({ route }) => {
          return {
            title: route.params.title || '',
          };
        }}
      />
    </RNStack.Navigator>
  );
}

function Home({ navigation }) {
  const parentStories: any[] = [];

  Object.keys(storyData).forEach(key => {
    const parentStory: any = storyData[key];
    parentStories.push(parentStory);
  });

  function onStorySelected(story) {
    navigation.navigate('Selected Stories', { parentStoryId: story.id, title: story.title });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <ScrollView style={styles.storyButtonsContainer}>
          {parentStories.map((story: any) => {
            return (
              <StoryButton
                key={story.id}
                title={story.title}
                onPress={() => onStorySelected(story)}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function SelectedStories({ navigation, route }) {
  const parentStories: any = [];

  const { parentStoryId = '' } = route.params || {};

  Object.keys(storyData).forEach(key => {
    if (key === parentStoryId) {
      parentStories.push(storyData[key]);
    }
  });

  function onStorySelected(story, displayStoryTitle = false) {
    navigation.navigate('Stories Detail', {
      selectedStoryId: story.id,
      title: story.name,
      displayStoryTitle,
    });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView style={styles.flexContainer}>
        {parentStories.map(story => {
          return (
            <View key={story.id}>
              {story.stories.map(s => {
                return <StoryButton key={s.id} title={s.name} onPress={() => onStorySelected(s)} />;
              })}
              {story.stories.length > 1 && (
                <StoryButton
                  title="See All"
                  color={lightTheme.button.tertiary.background}
                  onPress={() => onStorySelected(story, true)}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function StoriesDetail({ navigation, route }) {
  const { selectedStoryId = '', displayStoryTitle = true } = route.params || {};

  const selectedStories = [];

  if (selectedStoryId !== '') {
    Object.keys(stories).forEach(key => {
      if (key.startsWith(selectedStoryId)) {
        // @ts-ignore
        selectedStories.push(stories[key]);
      }
    });
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.flexContainer}>
        <ScrollView style={styles.flexContainer}>
          {Object.entries(selectedStories).map(([key, story]: [string, any]) => {
            return (
              <View key={`${key}`} style={styles.storyRow}>
                {displayStoryTitle && <Text style={styles.storyTitle}>{story?.name || ''}</Text>}
                {React.createElement(story)}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function StoryButton({ title, color = lightTheme.button.primary.background, onPress }) {
  return (
    // @ts-ignore
    <Pressable style={[styles.storyButton, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.storyButtonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: lightTheme.background.default,
    padding: spacing[3],
  },

  storyRow: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderColor: lightTheme.border.default,
  },
  storyTitle: {
    marginBottom: spacing[2],
    fontSize: 20,
    fontWeight: '500',
  },

  storyButtonsContainer: {
    padding: spacing[4],
    backgroundColor: lightTheme.background.default,
  },
  storyButton: {
    borderRadius: 4,
    paddingVertical: spacing[4],
    marginVertical: spacing[2],
    backgroundColor: lightTheme.button.primary.background,
    ...shadows.button,
  },
  storyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: lightTheme.button.primary.foreground,
    textAlign: 'center',
  },
  refreshButton: {
    position: 'absolute',
    padding: spacing[3],
    bottom: spacing[6],
    left: 0,
    right: 0,
  },
  refreshLoader: {
    position: 'absolute',
    right: spacing[4],
    bottom: 0,
    top: 0,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
