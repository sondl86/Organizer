import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import AppointmentListItem from "./AppointmentListItem";
import { Fragment } from "react";

export default observer(function AppointmentList() {
    
    const { appointmentStore } = useStore();
    const { groupedAppointemnts } = appointmentStore
    
    return (
        <>
            {groupedAppointemnts.map(([group, appointments]) => (
                <Fragment key={group}>
                    <Header sub color="purple">
                        {group}
                    </Header>
                        {appointments.map(appointment => (
                            <AppointmentListItem key={appointment.id} appointment={appointment} />
                        ))}
                </Fragment>
            ))}
        </>
    )
})