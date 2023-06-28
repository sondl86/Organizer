import React from "react"
import Calendar from "react-calendar"
import { Header, Menu } from "semantic-ui-react"

export default function AppointmentFilters(){
    return(
        <>
            <Menu vertical size="large" style={{width: '100%', marginTop:'25px'}}>
                <Header icon="filter" attached color="purple" content="Filters"/>
                <Menu.Item content="All Appointments"/>
                <Menu.Item content="I'm going"/>
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}