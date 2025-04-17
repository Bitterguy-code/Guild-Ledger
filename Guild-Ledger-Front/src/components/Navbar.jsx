import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import Button from 'react-bootstrap/Button';
import { userLogOut } from './utils';

export default function GLNavbar() {
    let { user, setUser } = useContext(UserContext)
    if (user == null) {
        return (
            <Navbar>
                <Container>
                    <Navbar.Brand>Guild Ledger</Navbar.Brand>
                    <Nav as={Link} to="/">Home</Nav>
                    <Nav as={Link} to="/about">About</Nav>
                    <Nav.Link disabled>Key</Nav.Link>
                    <Nav.Link disabled>Characters</Nav.Link>
                    <Nav.Link disabled>Watchlist</Nav.Link>
                    <Nav as={Link} to="/login">Login</Nav>
                </Container>
            </Navbar>
        );
    } else {
        return(
            <Navbar>
                <Container>
                    <Navbar.Brand>Guild Ledger</Navbar.Brand>
                    <Nav as={Link} to="/">Home</Nav>
                    <Nav as={Link} to="/about">About</Nav>
                    <Nav as={Link} to="/key">Key</Nav>
                    <Nav as={Link} to="/characters">Characters</Nav>
                    <Nav as={Link} to="/watchlist">Watchlist</Nav>
                    <Button variant="outline-danger" onClick={async() => setUser(await userLogOut())}>Logout</Button>
                </Container>
            </Navbar>
        )        
    }
}