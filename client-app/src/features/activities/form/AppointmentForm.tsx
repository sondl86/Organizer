import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Appointment } from "../../../app/models/Appointment";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from "uuid"
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

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
        date: null,
        city: '',
        address: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The appointment title is required'),
        description: Yup.string().required('The appointment description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        city: Yup.string().required(),
        address: Yup.string().required(),
        
    })

    useEffect(() => {
        if (id) loadAppointment(id).then(appointment => setAppointment(appointment!))
    },[id, loadAppointment])

    function handleFormSubmit(appointment: Appointment){
        if (!appointment.id) {
            appointment.id = uuid()
            createAppointment(appointment).then(() => navigate(`/appointments/${appointment.id}`))
        }else{
            updateAppoitment(appointment).then(() => navigate(`/appointments/${appointment.id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent content="Loading appointment..."/>

    return (

        //clears any previously floats in our html
        <Segment clearing>
            <Header content="Appointment Details" sub color="purple" />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={appointment} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea placeholder="Description" name='description' rows={3} />
                        <MySelectInput options={categoryOptions} placeholder="Category" name='category' />
                        <MyDateInput 
                            placeholderText="Date" 
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa' 
                        />
                        <Header content="Location Details" sub color="purple" />
                        <MyTextInput placeholder="City" name='city' />
                        <MyTextInput placeholder="Address" name='address' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated="right" 
                            color="yellow" type="submit" 
                            content="Submit"/>
                        <Button as={Link} to='/appointments' floated="right" type="button" content="Cancel"/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})