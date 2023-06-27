import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Personal Organizer
                </Menu.Item>
                <Menu.Item as={NavLink} to='/appointments' name="Appointments" />
                <Menu.Item>
                    <Button as={NavLink} to='/createAppointment' color="yellow" content='Create Appointment'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}