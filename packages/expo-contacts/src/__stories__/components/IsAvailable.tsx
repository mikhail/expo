import * as Contacts from 'expo-contacts';
import { Button } from 'expo-stories/shared/components';
import * as React from 'react';
import { Text } from 'react-native';

export function IsAvailable() {
  const [isAvailable, setIsAvailable] = React.useState(null);

  async function getIsAvailable() {
    const result = await Contacts.isAvailableAsync();
    setIsAvailable(result);
  }

  React.useEffect(() => {
    getIsAvailable();
  }, []);

  async function onIsAvailablePress() {
    getIsAvailable();
  }

  return (
    <>
      <Button onPress={onIsAvailablePress} label="Fetch Is Available" />
      <Text>{JSON.stringify({ isAvailable }, null, '\t')}</Text>
    </>
  );
}
