//  @todo - add ios platform examples for contacts

import * as Contacts from 'expo-contacts';
import { Container } from 'expo-stories/shared/components';
import * as React from 'react';

import {
  IsAvailable,
  Permissions,
  AddContact,
  GetContactById,
  GetContacts,
  UpdateContact,
  PresentForm,
  WriteContactsToFile,
} from './components';

export function PermissionsExamples() {
  return (
    <>
      <Container labelTop="Getting isAvailable">
        <IsAvailable />
      </Container>
      <Container labelTop="Requesting Permissions">
        <Permissions />
      </Container>
    </>
  );
}

PermissionsExamples.storyConfig = {
  name: 'Requesting Permissions',
};

export function AddContactsExample() {
  return (
    <>
      <Container labelTop="Adding and removing a contact with first and last name">
        <AddContact contact={{ firstName: 'Andy', lastName: 'Smith' }} />
      </Container>

      <Container labelTop="Adding and removing a contact with a nickname">
        <AddContact contact={{ nickname: 'Joe', firstName: 'Andy', lastName: 'Smith' }} />
      </Container>
    </>
  );
}

AddContactsExample.storyConfig = {
  name: 'Adding and Removing Contacts',
};

export function GetContactsExample() {
  return (
    <>
      <Container labelTop="Queries 2 contacts">
        <GetContacts query={{ pageSize: 2 }} />
      </Container>
      <Container labelTop="Queries a single contact by id">
        <GetContactById />
      </Container>
    </>
  );
}

GetContactsExample.storyConfig = {
  name: 'Getting Contacts',
};

export function UpdateContactsExample() {
  return (
    <>
      <Container labelTop="Updates contact's last name">
        <UpdateContact
          initialContact={{ firstName: 'Andy', lastName: '123' }}
          updates={{ lastName: 'Wow' }}
        />
      </Container>
      <Container labelTop="Presents form to update contact">
        <PresentForm initialContact={{ firstName: 'Andrew', lastName: 'Smith' }} />
      </Container>
    </>
  );
}

UpdateContactsExample.storyConfig = {
  name: 'Updating Contacts',
};

export function WriteContactsToFileExample() {
  return (
    <>
      <Container labelTop="Provides a shareable contacts file">
        <WriteContactsToFile
          contactToShare={{ firstName: 'Hello', lastName: 'Joe' }}
          query={{ fields: [Contacts.Fields.FirstName] }}
        />
      </Container>
    </>
  );
}

WriteContactsToFileExample.storyConfig = {
  name: 'Sharing Contacts',
};

export default {
  title: 'Contacts',
};
