import React, { useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

export default observer(function AppointmentDetail() {

    const {appointmentStore} = useStore()
    const { selectedAppointment: appointment, loadAppointment, loadingInitial } = appointmentStore
    const {id} = useParams()

    useEffect(() => {
        if(id) loadAppointment(id)
    }, [id, loadAppointment])

    if(loadingInitial || !appointment) return <LoadingComponent />

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
                    <Button as={Link} to={`/manage/${appointment.id}`} basic color="yellow" content='Edit'/> 
                    <Button as={Link} to='/appointments' basic color="grey" content='Cancel'/> 
                </Button.Group>
            </Card.Content>
        </Card>
    )
})