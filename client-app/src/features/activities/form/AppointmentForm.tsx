import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Appointment } from "../../../app/models/Appointment";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from "uuid"

export default observer(function AppointmentForm () {

    const {appointmentStore} = useStore()
    const {selectedAppointment, createAppointment, updateAppoitment, loading, loadAppointment, loadingInitial} = appointmentStore
    const {id} = useParams()
    const navigate = useNavigate()

    const [appointment, setAppointment] = useState<Appointment>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        address: ''
    });

    useEffect(() => {
        if (id) loadAppointment(id).then(appointment => setAppointment(appointment!))
    },[id, loadAppointment])

    function handleSubmit(){
        if (!appointment.id) {
            appointment.id = uuid()
            createAppointment(appointment).then(() => navigate(`/appointments/${appointment.id}`))
        }else{
            updateAppoitment(appointment).then(() => navigate(`/appointments/${appointment.id}`))
        }
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        // we spread the existing properties of the appointment
        // and than target the property that matches the name, 
        //the property with the key of name - should be set to - whatever the value is inside this inputs element
        setAppointment({...appointment, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content="Loading appointment..."/>

    return (
        //clears any previously floats in our html
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={appointment?.title} name='title' 
                    onChange={handleInputChange}>
                </Form.Input>
                <Form.TextArea placeholder="Description" value={appointment?.description} name='description' 
                    onChange={handleInputChange}>
                </Form.TextArea>
                <Form.Input placeholder="Category" value={appointment?.category} name='category' 
                    onChange={handleInputChange}>
                </Form.Input>
                <Form.Input type='date' placeholder="Date" value={appointment?.date} name='date' 
                    onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" value={appointment?.city} name='city' 
                    onChange={handleInputChange}>
                </Form.Input>
                <Form.Input placeholder="Address" value={appointment?.address} name='address' 
                    onChange={handleInputChange}>
                </Form.Input>
                <Button loading={loading} floated="right" color="yellow" type="submit" content="Submit"/>
                <Button as={Link} to='/appointments' floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    )
})