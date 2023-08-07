const { program } = require("commander");
const {
   listContacts,
   getContactById,
   removeContact,
   addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
   switch (action) {
      case "list":
         const contactsList = await listContacts();
         return console.table(contactsList);

      case "get":
         const contact = await getContactById(id);
         return console.log(contact);

      case "add":
         const newContact = await addContact(name, email, phone);
         return console.log(newContact);

      case "remove":
         const removedContact = await removeContact(id);
         return console.log(removedContact);

      default:
         console.warn("\x1B[31m Unknown action type!");
   }
}

program
   .option("--action, <type>")
   .option("--id, <type>")
   .option("--name, <type>")
   .option("--email, <type>")
   .option("--phone, <type>");

program.parse();
const options = program.opts();
invokeAction(options);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//    action: "add",
//    name: "qwe",
//    email: "qweqwe@gmail.com",
//    phone: "1234567890",
// });
// invokeAction({ action: "remove", id: "fZVo4Z761CVz3r_guL9a2" });
