import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function AppointmentList() {
    
    const { appointmentStore } = useStore();
    const { loading, appointmentsByDate, deleteAppointment } = appointmentStore

    const [target, setTarget] = useState('');

    function handleAppointmentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteAppointment(id)
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {appointmentsByDate.map(appointment => (
                    <Item key={appointment.id}> 
                        <Item.Content>
                            <Item.Header as='a'>{appointment.title}</Item.Header>
                            <Item.Meta>{appointment.date}</Item.Meta>
                            <Item.Description>
                                <div>{appointment.description}</div>
                                <div>{appointment.city}, {appointment.address}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/appointments/${appointment.id}`}
                                    floated='right' content='View' color="yellow"/>
                                <Button 
                                    name={appointment.id}
                                    loading={loading && target === appointment.id }
                                    onClick={(e) => handleAppointmentDelete(e, appointment.id)}
                                    floated='right' content='Delete' color="red"/>
                                <Label basic content={appointment.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})