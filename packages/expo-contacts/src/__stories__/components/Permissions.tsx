import * as Contacts from 'expo-contacts';
import { Button, Container } from 'expo-stories/shared/components';
import * as React from 'react';
import { Text } from 'react-native';

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
    <Container>
      <Button onPress={onRequestPermissions} label="Request Contact Permissions" />
      <Text>{JSON.stringify(status, null, '\t')}</Text>
    </Container>
  );
}
