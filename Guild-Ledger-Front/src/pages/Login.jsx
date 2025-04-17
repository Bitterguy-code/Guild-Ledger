import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { userLogIn } from '../components/utils';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { UserContext } from '../contexts/userContext';


const LogIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            setUser(await userLogIn(username, password))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <h1>Login</h1>
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Group className='mb-3' controlID='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="username"
                        placeholder="Enter username"
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlID='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Link to='/signup/'>Don't have an account? Sign up!</Link>
        </>
    )
}

export default LogIn