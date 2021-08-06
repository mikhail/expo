import * as Contacts from 'expo-contacts';
import { Button, Container } from 'expo-stories/shared/components';
import * as React from 'react';

import { useContact } from '../helpers';
import { ContactCard } from './ContactCard';

type IUpdateContact = {
  updates?: Partial<Contacts.Contact>;
  initialContact?: Partial<Contacts.Contact>;
  description?: string;
};

export function UpdateContact({ updates, initialContact, description }: IUpdateContact) {
  const { contact, updateContactAsync, addContactAsync, removeContactAsync } = useContact(
    initialContact
  );

  async function onUpdateContactPress() {
    await updateContactAsync(updates);
  }

  return (
    <Container labelTop={description}>
      <ContactCard contact={contact} />

      {contact && <Button onPress={onUpdateContactPress} label="Update Contact" />}

      <Button
        label={contact ? 'Remove Contact' : 'Add Contact'}
        onPress={contact ? removeContactAsync : addContactAsync}
        variant={contact ? 'secondary' : 'primary'}
      />
      {/* <Text>{JSON.stringify(contact, null, '\t')}</Text> */}
    </Container>
  );
}
