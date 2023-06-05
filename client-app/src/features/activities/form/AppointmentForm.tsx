import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function AppointmentForm () {

    const {appointmentStore} = useStore()
    const {selectedAppointment, closeForm, createAppointment, updateAppoitment, loading} = appointmentStore

    //if appointment is null than anything to the right is used for initial state
    const initialState = selectedAppointment ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        address: ''
    }

    const [appointment, setAppointment] = useState(initialState);

    function handleSubmit(){
        appointment.id ? updateAppoitment(appointment) : createAppointment(appointment)    
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        // we spread the existing properties of the appointment
        // and than target the property that matches the name, 
        //the property with the key of name - should be set to - whatever the value is inside this inputs element
        setAppointment({...appointment, [name]: value})
    }

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
                <Button onClick={closeForm} floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    )
})