import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "../../../app/models/Profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";
import { List, Popup, Image } from "semantic-ui-react";

interface Props {
    attendees: Profile [];
}

export default observer(function AppointmentListItemAttendee({attendees}: Props) {
    return(
        <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.userName}
                    trigger={
                        <List.Item key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`}>
                            <Image size='mini' circular src={attendee.image || 'assets/user.png'}/>
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee}/>
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})