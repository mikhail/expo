import * as Contacts from 'expo-contacts';
import { Button, Container } from 'expo-stories/shared/components';
import * as React from 'react';

import { useContact } from '../helpers';
import { ContactCard } from './ContactCard';

type IAddContact = {
  contact: Partial<Contacts.Contact>;
  description?: string;
};

export function AddContact({ contact: initialContact, description = '' }: IAddContact) {
  const { contact, addContactAsync, removeContactAsync } = useContact(initialContact);

  return (
    <Container labelTop={description}>
      <ContactCard contact={contact} />

      <Button
        onPress={contact ? removeContactAsync : addContactAsync}
        label={contact ? 'Remove Contact' : 'Add Contact'}
        variant={contact ? 'secondary' : 'primary'}
      />
      {/* <Text>{JSON.stringify(createdContact, null, '\t')}</Text> */}
    </Container>
  );
}
