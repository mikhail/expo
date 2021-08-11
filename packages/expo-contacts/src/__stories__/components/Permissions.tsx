import * as Contacts from 'expo-contacts';
import { Button } from 'expo-stories/shared/components';
import { Json } from 'expo-stories/shared/components/Json';
import * as React from 'react';

export function Permissions() {
  const [status, setStatus] = React.useState({});

  async function getPermissions() {
    const status = await Contacts.getPermissionsAsync();
    setStatus(status);
  }

  React.useEffect(() => {
    getPermissions();
  }, []);

  async function onRequestPermissions() {
    await Contacts.requestPermissionsAsync();
    await getPermissions();
  }

  return (
    <>
      <Button onPress={onRequestPermissions} label="Request Contact Permissions" />
      <Json json={status} />
    </>
  );
}
