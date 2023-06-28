import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import AppointmentForm from '../../features/activities/form/AppointmentForm';
import AppointmentDashboard from '../../features/activities/dashboard/AppointmentDashboard';
import HomePage from '../../features/home/HomePage';
import AppointmentDetail from '../../features/activities/details/AppointmentDetail';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App /> ,
        //the children are replaced in the Outlet component
        children: [
            {path: 'appointments', element: <AppointmentDashboard />},
            {path: 'appointments/:id', element: <AppointmentDetail />},
            {path: 'createAppointment', element: <AppointmentForm key="create"/>},
            {path: 'manage/:id', element: <AppointmentForm key="manage" />},
            
        ]
    }
]

export const router = createBrowserRouter(routes);