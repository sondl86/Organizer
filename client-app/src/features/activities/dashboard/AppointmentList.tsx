import React from "react";
import { Appointment } from "../../../app/models/Appointment";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props{
    appointments : Appointment[];
    selectAppointment : (id : string) => void;
    deleteAppointment : (id : string) => void;
}

export default function AppointmentList({appointments, selectAppointment, deleteAppointment}: Props) {
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
                                <Button 
                                    //this way the function doesnt immediately execute, only when its clicked
                                    onClick={() => selectAppointment(appointment.id)}
                                    floated='right' content='View' color="yellow"/>
                                <Button 
                                    onClick={() => deleteAppointment(appointment.id)}
                                    floated='right' content='Delete' color="red"/>
                                <Label basic content={appointment.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}