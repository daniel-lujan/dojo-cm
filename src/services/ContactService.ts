import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

class ContactService {
  private readonly fileName = "contacts.json";

  async loadContacts(): Promise<Contact[]> {
    try {
      const result = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      const contacts = JSON.parse(result.data as string);
      return contacts.map((contact: Contact) => ({
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
      }));
    } catch {
      console.log("No contacts file found, returning empty array");
      return [];
    }
  }

  async saveContacts(contacts: Contact[]): Promise<void> {
    try {
      const data = JSON.stringify(contacts, null, 2);
      await Filesystem.writeFile({
        path: this.fileName,
        data,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    } catch (error) {
      console.error("Error saving contacts:", error);
      throw new Error("Failed to save contacts");
    }
  }

  async addContact(contactForm: ContactForm): Promise<Contact> {
    const newContact: Contact = {
      id: this.generateId(),
      ...contactForm,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const contacts = await this.loadContacts();
    contacts.push(newContact);
    await this.saveContacts(contacts);

    return newContact;
  }

  async updateContact(id: string, contactForm: ContactForm): Promise<Contact> {
    const contacts = await this.loadContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      throw new Error("Contact not found");
    }

    const updatedContact: Contact = {
      ...contacts[index],
      ...contactForm,
      updatedAt: new Date(),
    };

    contacts[index] = updatedContact;
    await this.saveContacts(contacts);

    return updatedContact;
  }

  async deleteContact(id: string): Promise<void> {
    const contacts = await this.loadContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    await this.saveContacts(filteredContacts);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const contactService = new ContactService();
