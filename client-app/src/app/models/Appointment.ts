export interface Appointment {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    address: string;
}