import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import Button from 'react-bootstrap/Button';
import { userLogOut } from './utils';

export default function GLNavbar() {
    const { user, setUser } = useContext(UserContext)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await setUser(await userLogOut())
        } finally {
            setIsLoggingOut(false)
        }
    }


    if (user === null) {
        return(
        <Navbar className='gw2-navbar'>
            <Container>
                <Navbar.Brand className='nav-brand'>Guild Ledger</Navbar.Brand>
                <Nav as={Link} to="/" className='nav-link'>Home</Nav>
                <Nav as={Link} to="/about" className='nav-link'>About</Nav>
                <Nav.Link disabled className='nav-link'>Key</Nav.Link>
                <Nav.Link disabled className='nav-link'>Characters</Nav.Link>
                <Nav.Link disabled className='nav-link'>Watchlist</Nav.Link>
                <Nav as={Link} to="/login" className='nav-link'>Login</Nav>
            </Container>
        </Navbar>
        )
        }
        return (
            <Navbar className='gw2-navbar'>
            <Container>
                <Navbar.Brand className='nav-brand'>Guild Ledger</Navbar.Brand>
                <Nav as={Link} to="/" className='nav-link'>Home</Nav>
                <Nav as={Link} to="/about" className='nav-link'>About</Nav>
                <Nav as={Link} to="/key" className='nav-link'>Key</Nav>
                <Nav as={Link} to="/characters" className='nav-link'>Characters</Nav>
                <Nav as={Link} to="/watchlist" className='nav-link'>Watchlist</Nav>
                <Button variant="outline-danger" onClick={async() => setUser(await userLogOut())}>Logout</Button>
            </Container>
            </Navbar>
        )
}
                    
                
    