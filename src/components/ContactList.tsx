import React from "react";
import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonList,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { trash, call, mail } from "ionicons/icons";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: string) => void;
  loading: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDeleteContact,
  loading,
}) => {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <IonSpinner name="circular" />
        <IonText color="medium" style={{ marginLeft: "1rem" }}>
          Cargando contactos...
        </IonText>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
        }}
      >
        <IonText color="medium">
          <h3>No hay contactos</h3>
          <p>Agrega tu primer contacto usando el botón +</p>
        </IonText>
      </div>
    );
  }

  return (
    <IonList inset className="space-y-4">
      {contacts.map((contact) => (
        <IonItem
          key={contact.id}
          lines="none"
          className="border border-gray-100 shadow p-6 rounded-xl"
        >
          <IonLabel>
            <h2>{contact.name}</h2>
            <p>
              <IonIcon
                icon={call}
                size="small"
                color="primary"
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              {contact.phone}
            </p>
            <p>
              <IonIcon
                icon={mail}
                size="small"
                color="secondary"
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              {contact.email}
            </p>
          </IonLabel>
          <IonButton
            slot="end"
            fill="clear"
            color="danger"
            onClick={() => onDeleteContact(contact.id)}
            aria-label={`Eliminar contacto ${contact.name}`}
          >
            <IonIcon icon={trash} />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};
