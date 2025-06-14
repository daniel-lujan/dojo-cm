interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactForm {
  name: string;
  phone: string;
  email: string;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}
