import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function AppointmentDetail() {

    const {appointmentStore} = useStore()
    const { selectedAppointment: appointment, openForm, cancelSelectedAppointment } = appointmentStore

    if(!appointment) return <LoadingComponent />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${appointment.category}.png`}/>
            <Card.Content>
                <Card.Header>{appointment.title}</Card.Header>
                <Card.Meta>
                    <span>{appointment.date}</span>
                </Card.Meta>
                <Card.Description>
                    {appointment.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width='2'>
                    <Button 
                        onClick={() => openForm(appointment.id)}
                        basic color="yellow" content='Edit'/> 
                    <Button 
                        // here withour parenthesis, because we passing no parameters down
                        onClick={cancelSelectedAppointment}
                        basic color="grey" content='Cancel'/> 
                </Button.Group>
            </Card.Content>
        </Card>
    )
}