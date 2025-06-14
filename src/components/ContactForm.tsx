import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";

interface ContactFormProps {
  onSubmit: (contact: ContactForm) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  onCancel,
  loading,
}) => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Formato de teléfono inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // TODO: Mostrar mensaje de éxito con componente nativo (Alert)
      setFormData({ name: "", phone: "", email: "" });
      setErrors({});
    } catch (error) {
      // TODO: Mostrar mensaje de error con componente nativo (Alert)
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <IonCard
      className="mx-0"
      style={{
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      }}
    >
      <IonCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <IonItem className={`${errors.name ? "border-red-300" : ""}`}>
            <IonLabel position="stacked" className="font-medium">
              Nombre *
            </IonLabel>
            <IonInput
              value={formData.name}
              onIonInput={(e) => handleInputChange("name", e.detail.value!)}
              placeholder="Ingresa el nombre completo"
              required
              className={errors.name ? "text-red-600" : ""}
            />
          </IonItem>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 px-4">{errors.name}</p>
          )}

          <IonItem className={`${errors.phone ? "border-red-300" : ""}`}>
            <IonLabel position="stacked" className="font-medium">
              Teléfono *
            </IonLabel>
            <IonInput
              value={formData.phone}
              onIonInput={(e) => handleInputChange("phone", e.detail.value!)}
              placeholder="Ej: +57 300 123 4567"
              type="tel"
              required
              className={errors.phone ? "text-red-600" : ""}
            />
          </IonItem>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 px-4">{errors.phone}</p>
          )}

          <IonItem className={`${errors.email ? "border-red-300" : ""}`}>
            <IonLabel position="stacked" className="font-medium">
              Email *
            </IonLabel>
            <IonInput
              value={formData.email}
              onIonInput={(e) => handleInputChange("email", e.detail.value!)}
              placeholder="ejemplo@correo.com"
              type="email"
              required
              className={errors.email ? "text-red-600" : ""}
            />
          </IonItem>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 px-4">{errors.email}</p>
          )}

          <div className="flex gap-3 pt-4">
            <IonButton
              expand="block"
              fill="clear"
              color="medium"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-900 hover:bg-gray-200"
              style={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Cancelar
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-blue-100 hover:bg-blue-500"
              style={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              {loading ? "Guardando..." : "Guardar Contacto"}
            </IonButton>
          </div>
        </form>
      </IonCardContent>
    </IonCard>
  );
};
