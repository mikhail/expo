import { spacing, lightTheme } from '@expo/styleguide-native';
import * as React from 'react';
import { View, StyleSheet, Text, ViewProps } from 'react-native';

type ContainerProps = ViewProps & {
  labelTop?: string;
  labelBottom?: string;
  children?: React.ReactNode;
};

export function Container({
  children,
  labelTop = '',
  labelBottom = '',
  style,
  ...rest
}: ContainerProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {Boolean(labelTop) && <Text style={styles.description}>{labelTop}</Text>}
      {children}
      {Boolean(labelBottom) && <Text style={styles.description}>{labelBottom}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[2],
    marginBottom: spacing[8],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: lightTheme.background.quaternary,
  },

  description: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: spacing[3],
  },
});
