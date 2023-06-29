import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Appointment } from '../../../app/models/Appointment';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'

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

export default observer (function appointmentDetailedHeader({appointment}: Props) {

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${appointment.category}.png`} fluid style={appointmentImageStyle}/>
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
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='purple'>Join appointment</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${appointment.id}`} color='yellow' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})