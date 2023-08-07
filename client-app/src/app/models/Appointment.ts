import { Profile } from "./Profile";

export interface Appointment {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    address: string;
    hostUserName: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost:boolean;
    host?: Profile;
    attendees: Profile[];
}

export class Appointment implements Appointment{
    constructor(init?: AppointmentFormValues) {
        Object.assign(this, init)
    }
}

export class AppointmentFormValues{
    id?: string = undefined;
    title: string = '';
    date: Date | null = null;
    description: string = '';
    category: string = '';
    city: string = '';
    address: string = '';

    constructor(appointment?: AppointmentFormValues){
        if(appointment){
            this.id = appointment.id;
            this.title = appointment.title;
            this.date = appointment.date;
            this.description = appointment.description;
            this.category = appointment.category;
            this.city = appointment.city;
            this.address = appointment.address;
        }
       // console.log("constructor",appointment)
    }
}