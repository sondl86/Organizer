import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Appointment} from "../../../app/models/Appointment";
import { format } from 'date-fns'

interface Props {
    appointment: Appointment
}

export default observer(function appointmentDetailedInfo({appointment}: Props) {

    return (
        <Segment.Group style={{color: 'black'}}>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{appointment.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='purple'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(appointment.date!, 'dd MMM yyyy h:mm aa')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='purple'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{appointment.city}, {appointment.address}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
