const { writeFile } = require("fs");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
   const allContacts = await fs.readFile(contactsPath);
   return JSON.parse(allContacts);
}

async function getContactById(contactId) {
   const allContacts = await listContacts();
   const contact = allContacts.find((item) => item.id === contactId);

   return contact || null;
}

async function removeContact(contactId) {
   const allContacts = await listContacts();
   const contactIndex = allContacts.findIndex((item) => item.id === contactId);

   if (contactIndex === -1) {
      return null;
   } else {
      const removedContact = allContacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

      return removedContact;
   }
}

async function addContact(name, email, phone) {
   const allContacts = await listContacts();

   const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
   };

   allContacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
   return newContact;
}

module.exports = {
   listContacts,
   getContactById,
   removeContact,
   addContact,
};
