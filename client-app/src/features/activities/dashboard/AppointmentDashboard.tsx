import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./AppointmentList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import AppointmentFilters from "./AppointmentFilter";

//destructure activity properties that we passing down
export default observer(function ActivityDashboard() {
    
    const {appointmentStore} = useStore()
    const {loadAppointments, appointmentRegistry} = appointmentStore

    useEffect(() => {
        if(appointmentRegistry.size <= 1){
            loadAppointments();
        }
    }, [loadAppointments, appointmentRegistry.size])

    if(appointmentStore.loadingInitial){
        return <LoadingComponent content='Loading app'/>
    }
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                <AppointmentFilters />         
            </Grid.Column>
        </Grid>
    )
})
