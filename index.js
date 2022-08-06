const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with ${id} id not found`);
      }
      console.table(contact);
      break;

    case "add":
      const addNewContact = await contacts.addContact(name, email, phone);
      console.table(addNewContact);
      break;

    case "remove":
      const remove = await contacts.removeContact(id);
      console.table(remove);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
