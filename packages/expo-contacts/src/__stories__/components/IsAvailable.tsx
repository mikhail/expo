import * as Contacts from 'expo-contacts';
import { Button } from 'expo-stories/shared/components';
import { Json } from 'expo-stories/shared/components/Json';
import * as React from 'react';

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
      <Json json={{ isAvailable }} />
    </>
  );
}
