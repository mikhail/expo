//  @todo - add ios platform examples for contacts

import * as Contacts from 'expo-contacts';
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
      <IsAvailable />
      <Permissions />
    </>
  );
}

PermissionsExamples.storyConfig = {
  name: 'Requesting Permissions',
};

export function AddContactsExample() {
  return (
    <>
      <AddContact
        contact={{ firstName: 'Andy', lastName: 'Smith' }}
        description="Adding and removing a contact with first and last name"
      />

      <AddContact
        contact={{ nickname: 'Joe', firstName: 'Andy', lastName: 'Smith' }}
        description="Adding and removing a contact with a nickname"
      />
    </>
  );
}

AddContactsExample.storyConfig = {
  name: 'Adding and Removing Contacts',
};

export function GetContactsExample() {
  return (
    <>
      <GetContacts query={{ pageSize: 2 }} description="Queries 2 contacts" />
      <GetContactById description="Queries a single contact by id" />
    </>
  );
}

GetContactsExample.storyConfig = {
  name: 'Getting Contacts',
};

export function UpdateContactsExample() {
  return (
    <>
      <UpdateContact
        initialContact={{ firstName: 'Andy', lastName: '123' }}
        updates={{ lastName: 'Wow' }}
      />
      <PresentForm
        initialContact={{ firstName: 'Andrew', lastName: 'Smith' }}
        description="Presents form to update contact"
      />
    </>
  );
}

UpdateContactsExample.storyConfig = {
  name: 'Updating Contacts',
};

export function WriteContactsToFileExample() {
  return (
    <>
      <WriteContactsToFile
        contactToShare={{ firstName: 'Hello', lastName: 'Joe' }}
        query={{ fields: [Contacts.Fields.FirstName] }}
        description="Provides a shareable contacts file"
      />
    </>
  );
}

WriteContactsToFileExample.storyConfig = {
  name: 'Sharing Contacts',
};

export default {
  title: 'Contacts',
};
