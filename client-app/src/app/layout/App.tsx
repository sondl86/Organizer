import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Appointment } from '../models/Appointment';
import NavBar from './NavBar';
import AppointmentDashboard from '../../features/activities/dashboard/AppointmentDashboard';

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get<Appointment[]>('http://localhost:5000/api/appointments')
    .then(response => {
      setAppointments(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <AppointmentDashboard appointments={appointments}/>
      </Container>   
    </>
  );
}

export default App;
