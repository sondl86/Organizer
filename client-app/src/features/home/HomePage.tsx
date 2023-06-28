import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage(){
    return(
        <Container style={{marginTop: '7em'}}>
            <h1 style={{color: 'white'}}>Home page</h1>
            <h3 style={{color: 'white'}}>Go to <Link to='/appointments'>Appointments</Link></h3>
        </Container>
    )
}