import React from "react"
import { Link } from "react-router-dom"
import { Item, Button, Segment, ItemDescription, Icon } from "semantic-ui-react"
import { Appointment } from "../../../app/models/Appointment"

interface Props {
    appointment : Appointment
}

export default function AppointmentListItem({appointment}: Props) {

    return(
        <Segment.Group style={{color: 'black'}}>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src="/assets/user.png"/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/appointments/${appointment.id}`}>
                                {appointment.title}
                            </Item.Header>
                            <ItemDescription>Hosted by Bobby</ItemDescription>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/> {appointment.date}
                    <Icon name="marker"/> {appointment.city}
                </span>
            </Segment>
            <Segment secondary>
                Attendes go here
            </Segment>
            <Segment clearing>
                <span>{appointment.description}</span>
                <Button as={Link} to={`/appointments/${appointment.id}`} floated='right' content='View' color="purple"/>
            </Segment>
        </Segment.Group>
    )
}
