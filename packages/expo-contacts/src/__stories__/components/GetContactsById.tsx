import * as Contacts from 'expo-contacts';
import { Button, Container } from 'expo-stories/shared/components';
import * as React from 'react';

import { ContactCard } from './ContactCard';

type IGetContactById = {
  id?: string;
  fields?: Contacts.FieldType[];
  description?: string;
};

export function GetContactById({ id, fields, description = '' }: IGetContactById) {
  const [contact, setContact] = React.useState<Contacts.Contact | null>(null);
  const [didFetch, setDidFetch] = React.useState(false);

  async function onGetContactsPress() {
    if (!id) {
      const fetchedContacts = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.ID],
        pageSize: 1,
      });

      const [contact] = fetchedContacts.data;
      id = contact.id;
    }

    const fetchedContact = await Contacts.getContactByIdAsync(id, fields);
    setContact(fetchedContact);
    setDidFetch(true);
  }

  async function onResetPress() {
    setContact(null);
    setDidFetch(false);
  }

  return (
    <Container labelTop={description}>
      <ContactCard contact={contact} />
      <Button
        onPress={didFetch ? onResetPress : onGetContactsPress}
        label={didFetch ? 'Reset' : 'Get Contact'}
        variant={didFetch ? 'secondary' : 'primary'}
      />
      {/* <Text>{JSON.stringify(contact, null, '\t')}</Text> */}
    </Container>
  );
}
