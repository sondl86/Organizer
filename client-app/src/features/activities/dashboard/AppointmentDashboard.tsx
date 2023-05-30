import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Appointment } from "../../../app/models/Appointment";
import ActivityList from "./AppointmentList";
import AppointmentDetail from "../details/AppointmentDetail";

interface Props {
    appointments : Appointment[];
}

//destructure activity properties that we passing down
export default function ActivityDashboard({appointments}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList appointments={appointments}></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* anything to the right will execute as long the left isnt null or undefined */}
                {appointments[0] && <AppointmentDetail appointment={appointments[0]} />}
            </Grid.Column>
        </Grid>
    )
}