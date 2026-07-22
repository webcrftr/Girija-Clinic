export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  category: 'clinical' | 'diagnostic' | 'preventive' | 'specialty';
  duration: string;
  priceEstimate?: string;
  features: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  education: string;
  experience: string;
  bio: string;
  image: string;
  rating: number;
  reviewsCount: number;
  availability: string[];
  languages: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  verified: boolean;
  treatment: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  desc: string;
}

export interface AppointmentFormData {
  specialty: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}
