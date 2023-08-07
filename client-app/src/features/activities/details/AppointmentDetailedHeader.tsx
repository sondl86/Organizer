import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import { Appointment } from '../../../app/models/Appointment';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { useStore } from '../../../app/stores/store';

const appointmentImageStyle = {
    filter: 'brightness(30%)'
};

const appointmentImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    appointment: Appointment
}

export default observer (function AppointmentDetailedHeader({appointment}: Props) {
    const {appointmentStore: {updateAttendance, loading, cancelAppointmentToggle}} = useStore()
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {appointment.isCancelled && 
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }} ribbon color='red' content='Cancelled' />
                }
                <Image src={`/assets/categoryImages/${appointment.category}.jpg`} fluid style={appointmentImageStyle}/>
                <Segment style={appointmentImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={appointment.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(appointment.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>
                                            <Link to={`/profiles/${appointment.host?.userName}`}>
                                                {appointment.host?.displayName}
                                            </Link>
                                        </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {appointment.isHost ? (
                    <>
                        <Button 
                            color={appointment.isCancelled ? 'green' : 'red'} 
                            floated='left'
                            basic
                            content={appointment.isCancelled ? 'Re-activate Appointment' : 'Cancel Appointment'}
                            onClick={cancelAppointmentToggle}
                            loading={loading}
                        />
                        <Button as={Link} 
                            disabled={appointment.isCancelled}
                            to={`/manage/${appointment.id}`} 
                            color='yellow' 
                            floated='right'>
                            Manage Event
                        </Button>
                    </>
                ) : appointment.isGoing ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                    ) : (
                    <Button loading={loading} 
                        disabled={appointment.isCancelled} 
                        onClick={updateAttendance} 
                        color='purple'>Join Appointment
                    </Button>
                )}
            </Segment>
        </Segment.Group>
    )
})