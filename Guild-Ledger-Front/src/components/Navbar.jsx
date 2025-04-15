import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function GLNavbar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Guild Ledger</Navbar.Brand>
                <Nav as={Link} to="/">Home</Nav>
                <Nav as={Link} to="/about">About</Nav>
                <Nav as={Link} to="/key">Key</Nav>
                <Nav as={Link} to="/characters">Characters</Nav>
                <Nav as={Link} to="/login">Login</Nav>
                <Nav as={Link} to="/watchlist">Watchlist</Nav>
            </Container>
        </Navbar>
    );
}