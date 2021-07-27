import Checkbox, { CheckboxProps } from 'expo-checkbox';
import * as React from 'react';

function CheckboxExample(props: CheckboxProps) {
  const [value, setValue] = React.useState(false);
  return <Checkbox value={value} onValueChange={setValue} {...props} />;
}

export const Basic = () => <CheckboxExample />;
export const CustomColor = () => <CheckboxExample color="#4630EB" />;
export const Disabled = () => <CheckboxExample disabled />;
export const Styled = () => <CheckboxExample style={{ height: 32, width: 32 }} />;

export default {
  title: 'Expo Checkbox',
};
