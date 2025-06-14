import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { add, close, personAdd } from "ionicons/icons";
import { ContactList } from "../components/ContactList";
import { ContactForm } from "../components/ContactForm";
import { useContacts } from "../hooks/useContacts";

const Home: React.FC = () => {
  const { contacts, loading, error, addContact, deleteContact } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteContact = async (id: string) => {
    // TODO: Implementar confirmación antes de eliminar contacto con componente nativo (modal o alert)
    await deleteContact(id);
  };

  const handleAddContact = async (contactForm: ContactForm) => {
    try {
      await addContact(contactForm);
      setIsModalOpen(false);
      // TODO: Mostrar toast nativo de éxito
    } catch (error) {
      // TODO: Mostrar toast nativo de error
      console.error("Error adding contact:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-gradient-to-r from-blue-600 to-blue-700">
          <IonTitle className="text-white font-bold">
            Agenda de Contactos
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-gray-50">
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Mis Contactos ({contacts.length})
            </h2>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <ContactList
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
            loading={loading}
          />
        </div>

        {/* FAB con diseño minimalista y sombra mejorada */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => setIsModalOpen(true)}
            className="shadow-2xl"
            style={{
              "--background": "#3b82f6",
              "--background-hover": "#2563eb",
              "--background-focused": "#1d4ed8",
              "--box-shadow": "0 10px 25px rgba(59, 130, 246, 0.3)",
              "--border-radius": "16px",
            }}
          >
            <IonIcon icon={add} className="text-xl" />
          </IonFabButton>
        </IonFab>

        {/* Modal con diseño moderno */}
        <IonModal
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
          breakpoints={[0, 0.5, 0.8, 1]}
          initialBreakpoint={0.8}
          backdropDismiss={true}
          className="modern-modal"
        >
          {/* Header minimalista y elegante */}
          <IonHeader>
            <IonToolbar
              className="relative"
              style={{
                "--background": "#ffffff",
                "--min-height": "80px",
              }}
            >
              <div className="flex items-center px-6 py-4">
                <div className="flex items-center flex-1">
                  <div className="bg-blue-100 rounded-xl flex items-center justify-center aspect-square mr-4 h-ful min-w-12">
                    <IonIcon
                      icon={personAdd}
                      className="text-blue-600 text-xl"
                    />
                  </div>
                  <div>
                    <IonTitle className="text-gray-900 font-bold text-xl m-0 p-0">
                      Nuevo Contacto
                    </IonTitle>
                    <p className="text-gray-500 text-sm m-0 font-medium mt-1">
                      Agrega un nuevo contacto a tu agenda
                    </p>
                  </div>
                </div>

                <IonButtons slot="end">
                  <IonButton
                    onClick={() => setIsModalOpen(false)}
                    fill="clear"
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  >
                    <IonIcon icon={close} className="text-xl" />
                  </IonButton>
                </IonButtons>
              </div>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="h-1 bg-blue-500" />
            <ContactForm
              onSubmit={handleAddContact}
              onCancel={() => setIsModalOpen(false)}
              loading={loading}
            />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
