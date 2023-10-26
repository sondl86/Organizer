import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import AppointmentForm from '../../features/activities/form/AppointmentForm';
import AppointmentDashboard from '../../features/activities/dashboard/AppointmentDashboard';
import AppointmentDetail from '../../features/activities/details/AppointmentDetail';
import TestErrors from '../../features/errors/TestError';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import ProfilPage from '../../features/profiles/ProfilePage';

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
            {path: 'profiles/:username', element: <ProfilPage />},
            {path: 'login', element: <LoginForm />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]

export const router = createBrowserRouter(routes);