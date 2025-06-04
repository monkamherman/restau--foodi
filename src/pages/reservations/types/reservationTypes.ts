
export interface Reservation {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
}

export const reservationSchema = {
  name: { required: "Le nom est requis" },
  email: { 
    required: "L'email est requis",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Format d'email invalide"
    }
  },
  phone: { required: "Le téléphone est requis" },
  date: { required: "La date est requise" },
  time: { required: "L'heure est requise" },
  guests: { 
    required: "Le nombre de personnes est requis",
    min: { value: 1, message: "Minimum 1 personne" },
    max: { value: 12, message: "Maximum 12 personnes" }
  }
};
