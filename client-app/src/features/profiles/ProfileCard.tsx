import React from 'react'
import { Profile } from '../../app/models/Profile'
import { observer } from 'mobx-react-lite'
import { Card, CardContent, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

interface Props{
    profile: Profile
}

export default observer(function ProfileCard ({profile}: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.userName}`}>
            <Image src={profile.image || 'assets/user.png'}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>Bio goes here</Card.Description>
            </Card.Content>
            <CardContent extra>
                <Icon name='user'/>
                20 followers
            </CardContent>
        </Card>
    )
})