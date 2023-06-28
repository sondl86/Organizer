import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return(
        <Segment vertical textAlign='center' className='masthead'>
            <Container text>
                <Header style={{color: 'white'}}>
                    <div>
                        <h1>Personal Organizer</h1>
                        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12, width: '70%', height: 'auto', margin: '0 auto'}} />
                    </div>
                </Header>
                <Header as='h2' inverted content='Welcome to your Appointments' />
                <Button as={Link} to='/appointments' size='huge' inverted>
                    Take me to my Appointments
                </Button>
            </Container>
        </Segment>
    )
}