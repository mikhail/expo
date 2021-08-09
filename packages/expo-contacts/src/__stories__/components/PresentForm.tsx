import * as Contacts from 'expo-contacts';
import { Button } from 'expo-stories/shared/components';
import * as React from 'react';

import { useContact } from '../helpers';
import { ContactCard } from './ContactCard';

type IPresentForm = {
  initialContact?: Partial<Contacts.Contact>;
  formOptions?: Contacts.FormOptions;
};

// @todo - update docs on how to properly use this
export function PresentForm({ initialContact, formOptions }: IPresentForm) {
  const { contact, addContactAsync, removeContactAsync, updateContactAsync } = useContact(
    initialContact
  );

  async function onPresentFormPress() {
    if (contact.id) {
      await Contacts.presentFormAsync(contact.id, contact, formOptions);
      const updates = await Contacts.getContactByIdAsync(contact.id);
      await updateContactAsync(updates);
    }
  }

  return (
    <>
      <ContactCard contact={contact} />

      {contact && <Button label="Present Form" onPress={onPresentFormPress} />}

      <Button
        label={contact ? 'Remove Contact' : 'Add Contact'}
        onPress={contact ? removeContactAsync : addContactAsync}
        variant={contact ? 'secondary' : 'primary'}
      />
      {/* <Text>{JSON.stringify(contact, null, '\t')}</Text> */}
    </>
  );
}
