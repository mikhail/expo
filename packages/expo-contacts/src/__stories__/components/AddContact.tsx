import * as Contacts from 'expo-contacts';
import { Button } from 'expo-stories/shared/components';
import * as React from 'react';

import { useContact } from '../helpers';
import { ContactCard } from './ContactCard';

type IAddContact = {
  contact: Partial<Contacts.Contact>;
};

export function AddContact({ contact: initialContact }: IAddContact) {
  const { contact, addContactAsync, removeContactAsync } = useContact(initialContact);

  return (
    <>
      <ContactCard contact={contact} />

      <Button
        onPress={contact ? removeContactAsync : addContactAsync}
        label={contact ? 'Remove Contact' : 'Add Contact'}
        variant={contact ? 'secondary' : 'primary'}
      />
      {/* <Text>{JSON.stringify(createdContact, null, '\t')}</Text> */}
    </>
  );
}
