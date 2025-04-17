import { useState, useContext } from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert";
import { userRegistration } from "../components/utils";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const SignUp = () => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
            
        event.preventDefault()
        const result = await userRegistration(formData)
        if (!result.success) {
            setError(result.error||'Registration failed')
        } else {
            setUser(result.data)
            navigate('/')
        }
    }

    return (
        <>
            <h1>Sign the Ledger</h1>
            <Form
                onSubmit={handleSubmit}
            >
                {error && <Alert classname='error-alert'>{error}</Alert>}
                <Form.Group classname='mb-3' controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        type="text"
                        placeholder="Username"
                        required
                    />
                </Form.Group>

                <Form.Group classname="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        type='email'
                        placeholder='Email'
                        required
                    />
                </Form.Group>

                <Form.Group classname='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        type='password'
                        placeholder='Password'
                        required
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
            <Link to="/login/">Already have an account? Log in!</Link>
        </>
    )
}

export default SignUp