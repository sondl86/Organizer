import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Appointment } from '../models/Appointment';
import NavBar from './NavBar';
import AppointmentDashboard from '../../features/activities/dashboard/AppointmentDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Appointments.list().then(response => {
      let appointments : Appointment[] = []
      response.forEach(appointment => {
        appointment.date = appointment.date.split('T')[0]
        appointments.push(appointment)
      })
      setAppointments(appointments)
      setLoading(false)
    })
  }, [])

  function handleSelectAppointment(id : String) {
    setSelectedAppointment(appointments.find(appointment => appointment.id === id))
  }

  function handleCancelSelectAppointment(){
    setSelectedAppointment(undefined);
  }

  function handleFormOpen(id? : String){
    id ? handleSelectAppointment(id) : handleCancelSelectAppointment()
    setEditMode(true)
  }

  function handleFormClose(){
    setEditMode(false)
  }

  function handleCreateOrEditAppointment(appointment: Appointment){
    setSubmitting(true)
    if(appointment.id){
      agent.Appointments.update(appointment).then(() => {
        setAppointments([...appointments.filter(x => x.id !== appointment.id), appointment])
        setEditMode(false)
        setSelectedAppointment(appointment)
        setSubmitting(false)
      })
    }else{
      appointment.id = uuid();
      agent.Appointments.create(appointment).then(() => {
        //{...appointment} to get all of the prperties
        setAppointments([...appointments])
        setEditMode(false)
        setSelectedAppointment(appointment)
        setSubmitting(false)
      })
    } 
  }

  function handleDeleteAppointment(id: string) {
    setSubmitting(true)
    agent.Appointments.delete(id).then(() => {
      setAppointments(appointments.filter(x => x.id !== id))
      setSubmitting(false)
    })
  }

  if(loading){
    return <LoadingComponent content='Loading app'/>
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <AppointmentDashboard 
          appointments={appointments}
          selectedAppointment={selectedAppointment}
          selectAppointment={handleSelectAppointment}
          cancelSelectAppointment={handleCancelSelectAppointment}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditAppointment}
          deleteAppointment={handleDeleteAppointment}
          submitting={submitting}
          />
      </Container>   
    </>
  );
}

export default App;
