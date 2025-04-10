import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function GLNavbar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Guild Ledger</Navbar.Brand>
            </Container>
        </Navbar>
    );
}