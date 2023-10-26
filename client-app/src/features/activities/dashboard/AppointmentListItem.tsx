import React from "react"
import { Link } from "react-router-dom"
import { Item, Button, Segment, ItemDescription, Icon, Label } from "semantic-ui-react"
import { Appointment } from "../../../app/models/Appointment"
import { format } from 'date-fns'
import AppointmentListItemAttendee from "./AppointmentListItemAttendee"

interface Props {
    appointment : Appointment
}

export default function AppointmentListItem({appointment}: Props) {

    return(
        <Segment.Group style={{color: 'black'}}>
            <Segment>
                {appointment.isCancelled &&
                    <Label  attached="top" color='red' content='Cancelled' style={{ textAlign: 'center '}} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{ marginBottom: 5}} size="tiny" circular src={appointment.host?.image || 'assets/user.png'}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/appointments/${appointment.id}`}>
                                {appointment.title}
                            </Item.Header>
                            <ItemDescription>Hosted by <Link to={`/profiles/${appointment.hostUserName}`}>{appointment.host?.displayName}</Link></ItemDescription>
                            {appointment.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this appointment
                                    </Label>
                                </Item.Description>
                            )}
                            {appointment.isGoing && !appointment.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going this appointment
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/> {format(appointment.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name="marker"/> {appointment.city}
                </span>
            </Segment>
            <Segment secondary>
                <AppointmentListItemAttendee attendees={appointment.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{appointment.description}</span>
                <Button as={Link} to={`/appointments/${appointment.id}`} floated='right' content='View' color="purple"/>
            </Segment>
        </Segment.Group>
    )
}
