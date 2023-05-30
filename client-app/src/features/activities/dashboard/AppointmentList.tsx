import React from "react";
import { Appointment } from "../../../app/models/Appointment";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props{
    appointments : Appointment[];
}

export default function AppointmentList({appointments}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {appointments.map(appointment => (
                    <Item key={appointment.id}> 
                        <Item.Content>
                            <Item.Header as='a'>{appointment.title}</Item.Header>
                            <Item.Meta>{appointment.date}</Item.Meta>
                            <Item.Description>
                                <div>{appointment.description}</div>
                                <div>{appointment.city}, {appointment.address}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color="yellow"/>
                                <Label basic content={appointment.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}