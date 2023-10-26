import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos';
import { observer } from 'mobx-react-lite';
import { Profile } from '../../app/models/Profile';

interface Props{
    profile: Profile
}

export default observer(function ProfileContent({profile}: Props){
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane style={{color:'black'}}>About Content</Tab.Pane>},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Appointments', render: () => <Tab.Pane style={{color:'black'}}>Appointments Content</Tab.Pane>},
        {menuItem: 'Followers', render: () => <Tab.Pane style={{color:'black'}}>Followers Content</Tab.Pane>},
        {menuItem: 'Following', render: () => <Tab.Pane style={{color:'black'}}>Following Content</Tab.Pane>}
    ];

    return(
        <Tab 
            menu={{fluid:true, vertical:true}}
            menuPosition='right'
            panes={panes}
        />
    )
})