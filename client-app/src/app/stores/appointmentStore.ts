import { Appointment, AppointmentFormValues } from './../models/Appointment';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import {v4 as uuid } from 'uuid';
import { format } from 'date-fns'
import { store } from './store';
import { Profile } from '../models/Profile';

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
        const user = store.userStore.user;
        if(user) {
            appointment.isGoing = appointment.attendees!.some(
                a => a.userName === user.userName
            )
            appointment.isHost = appointment.hostUserName === user.userName;
            appointment.host = appointment.attendees!.find(x => x.userName === appointment.hostUserName);
        }
        appointment.date = new Date(appointment.date!)
        this.appointmentRegistry.set(appointment.id, appointment)
    }

    private getAppointment = (id: string) => {
        return this.appointmentRegistry.get(id)
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAppointment = async (appointment: AppointmentFormValues) => {
        const user = store.userStore.user
        const attendee = new Profile(user!)
        appointment.id = uuid();
        try{
            await agent.Appointments.create(appointment)
            const newAppointment = new Appointment(appointment)
            newAppointment.hostUserName = user!.userName
            newAppointment.attendees = [attendee]
            this.setAppointment(newAppointment)
            runInAction(() => {
               this.selectedAppointment = newAppointment
            })        
        }catch(error){
            console.log(error)
             
        }
    }

    updateAppointment = async (appointment: AppointmentFormValues) => {
        console.log("store: ", appointment)
        try{
            await agent.Appointments.update(appointment)
            runInAction(() => {
                if(appointment.id){
                    let updatedAppointment = {...this.getAppointment(appointment.id), ...appointment}
                    this.appointmentRegistry.set(appointment.id, updatedAppointment as Appointment)
                    this.selectedAppointment = updatedAppointment as Appointment
                }
            })
        }catch(error){
            console.log(error)
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

    updateAttendance = async () => {
        const user = store.userStore.user
        this.loading = true
        try{
            await agent.Appointments.attend(this.selectedAppointment!.id)
            runInAction(() => {
                if(this.selectedAppointment?.isGoing) {
                    //to remove the currently logged in user 
                    this.selectedAppointment.attendees = this. selectedAppointment.attendees?.filter(a => a.userName !== user?.userName)
                    this.selectedAppointment.isGoing = false
                }else{
                    //if there are not going we create a new profile
                    const attendee = new Profile(user!)
                    this.selectedAppointment?.attendees?.push(attendee)
                    this.selectedAppointment!.isGoing = true
                }
                //we update the appointment registry
                this.appointmentRegistry.set(this.selectedAppointment!.id, this.selectedAppointment!)
            })
        }catch(error){
            console.log(error)
        }finally{
            //no matter if there is an error or not, loading must be off
            runInAction(() => this.loading = false )
        }
    }

    cancelAppointmentToggle = async () => {
        this.loading = true
        try{
            await agent.Appointments.attend(this.selectedAppointment!.id)
            runInAction(() => {
                this.selectedAppointment!.isCancelled = !this.selectedAppointment?.isCancelled
                this.appointmentRegistry.set(this.selectedAppointment!.id, this.selectedAppointment!)
            })
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => this.loading = false )
        }
    }
}

