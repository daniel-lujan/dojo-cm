import { contactService } from "@/services/ContactService";
import { useState, useEffect } from "react";

export const useContacts = () => {
  const [state, setState] = useState<ContactsState>({
    contacts: [],
    loading: false,
    error: null,
  });

  const loadContacts = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const contacts = await contactService.loadContacts();
      setState((prev) => ({ ...prev, contacts, loading: false }));
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Error loading contacts",
      }));
    }
  };

  const addContact = async (contactForm: ContactForm) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const newContact = await contactService.addContact(contactForm);
      setState((prev) => ({
        ...prev,
        contacts: [...prev.contacts, newContact],
        loading: false,
      }));
      return newContact;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Error adding contact",
      }));
      throw error;
    }
  };

  const deleteContact = async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await contactService.deleteContact(id);
      setState((prev) => ({
        ...prev,
        contacts: prev.contacts.filter((contact) => contact.id !== id),
        loading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Error deleting contact",
      }));
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    ...state,
    addContact,
    deleteContact,
    refreshContacts: loadContacts,
  };
};
