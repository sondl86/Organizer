import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Appointment } from '../../../app/models/Appointment';

interface Props{
    appointment : Appointment;
}

export default observer(function ActivityDetailedSidebar ({appointment: {attendees, host}} : Props) {
    if(!attendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='purple'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.userName}>
                            {attendee.userName === host?.userName &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='violet'
                                    ribbon='right'
                                >
                                    Host
                                </Label>
                            }
                            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.userName}`} style={{ color: '#6435c9' }}>{attendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'violet' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})