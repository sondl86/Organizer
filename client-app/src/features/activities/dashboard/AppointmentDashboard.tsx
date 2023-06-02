import React from "react";
import { Grid } from "semantic-ui-react";
import { Appointment } from "../../../app/models/Appointment";
import ActivityList from "./AppointmentList";
import AppointmentDetail from "../details/AppointmentDetail";
import AppointmentForm from "../form/AppointmentForm";

interface Props {
    appointments : Appointment[];
    selectedAppointment : Appointment | undefined;
    selectAppointment : (id : string) => void;
    cancelSelectAppointment : () => void;
    editMode : boolean;
    openForm : (id : String) => void;
    closeForm : () => void;
    createOrEdit: (appointment : Appointment) => void;
    deleteAppointment : (id : string) => void;
}

//destructure activity properties that we passing down
export default function ActivityDashboard({appointments, selectAppointment, 
        selectedAppointment, cancelSelectAppointment, editMode, openForm, 
        closeForm, createOrEdit, deleteAppointment}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    appointments={appointments} 
                    selectAppointment={selectAppointment}
                    deleteAppointment={deleteAppointment}
                    ></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* anything to the right will execute as long the left isnt null or undefined */}
                {selectedAppointment && !editMode &&
                <AppointmentDetail 
                    appointment={selectedAppointment} 
                    cancelSelectAppointment={cancelSelectAppointment} 
                    openForm={openForm}
                />}
                {editMode &&  
                <AppointmentForm 
                    closeForm={closeForm} 
                    appointment={selectedAppointment}
                    createOrEdit={createOrEdit}
                ></AppointmentForm> }          
            </Grid.Column>
        </Grid>
    )
}