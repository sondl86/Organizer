import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage(){
    const {userStore, modalStore} = useStore();

    return(
        <Segment vertical textAlign='center' className='masthead'>
            <Container text>
                <Header style={{color: 'white'}}>
                    <div>
                        <h1>Personal Organizer</h1>
                        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12, width: '70%', height: 'auto', margin: '0 auto'}} />
                    </div>
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to your Appointments' />
                        <Button as={Link} to='/appointments' size='huge' inverted>
                            Go to Appointments!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})