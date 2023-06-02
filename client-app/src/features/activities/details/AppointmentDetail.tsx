import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Appointment } from "../../../app/models/Appointment";

interface Props{
    appointment : Appointment;
    cancelSelectAppointment : () => void;
    openForm : (id : String) => void;
}

export default function AppointmentDetail( {appointment, cancelSelectAppointment, openForm } : Props) {
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
                        onClick={cancelSelectAppointment}
                        basic color="grey" content='Cancel'/> 
                </Button.Group>
            </Card.Content>
        </Card>
    )
}