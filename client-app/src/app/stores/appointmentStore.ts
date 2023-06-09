import { Appointment } from './../models/Appointment';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import {v4 as uuid } from 'uuid';
import { format } from 'date-fns'

export default class AppointmentStore{
    appointmentRegistry = new Map<string, Appointment>();
    selectedAppointment: Appointment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get appointmentsByDate() {
        return Array.from(this.appointmentRegistry.values()).sort((a,b) => 
            a.date!.getTime() - b.date!.getTime())
    }

    get groupedAppointemnts(){
        return Object.entries(
            this.appointmentsByDate.reduce((appointments, appointment) => {
                const date = format(appointment.date!, 'dd MMM yyyy')
                // we look if there is a match on appointment date
                appointments[date] = appointments[date] ? [...appointments[date], appointment] : [appointment]
                return appointments
            }, {} as {[key: string] :  Appointment[]})
        )
    }

    loadAppointments = async () => {
        this.setLoadingInitial(true)
        try{
            const appointments = await agent.Appointments.list()
            appointments.forEach(appointment => {
                this.setAppointment(appointment)
            })
            this.setLoadingInitial(false)
        }catch(error){
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    loadAppointment = async (id: string) => {
        let appointment = this.getAppointment(id)
        if(appointment) {
            this.selectedAppointment = appointment
            return appointment
        }
            else {
            this.setLoadingInitial(true)
            try{
                appointment = await agent.Appointments.details(id)
                this.setAppointment(appointment)
                runInAction(() => this.selectedAppointment = appointment)
                this.setLoadingInitial(false)
                return appointment
            }catch(error){
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
    } 

    private setAppointment = (appointment : Appointment) => {

        appointment.date = new Date(appointment.date!)
        this.appointmentRegistry.set(appointment.id, appointment)
    }

    private getAppointment = (id: string) => {
        return this.appointmentRegistry.get(id)
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAppointment = async (appointment: Appointment) => {
        this.loading = true;
        appointment.id = uuid();
        try{
            await agent.Appointments.create(appointment)
            runInAction(() => {
               this.appointmentRegistry.set(appointment.id, appointment)
               this.selectedAppointment = appointment
               this.editMode = false
               this.loading = false;
            })        
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            }) 
        }
    }

    updateAppoitment = async (appointment: Appointment) => {
        this.loading = true;
        try{
            await agent.Appointments.update(appointment)
            runInAction(() => {
                this.appointmentRegistry.set(appointment.id, appointment)
                // [...] creates and replaces the current array :)
                //this.appointments = [...this.appointments.filter(x => x.id !== appointment.id), appointment]
                this.selectedAppointment = appointment
                this.editMode = false
                this.loading = false;
            })
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteAppointment = async (id: string) => {
        this.loading = true;
        try{
            await agent.Appointments.delete(id)
            runInAction(() => {
                this.appointmentRegistry.delete(id)
                //this.appointments = [...this.appointments.filter(x => x.id !== id)]
                this.loading = false
            })
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }
}

