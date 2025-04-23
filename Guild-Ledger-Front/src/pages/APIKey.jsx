import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiKey, FiExternalLink} from 'react-icons/fi'
import api from '../api';



const GW2KeyForm = () => {
    const [apiKey, setApiKey] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const validateKeyFormat = (key) => {
        //Handling format validation on the client side end
        return key.length === 72 && /^[A-Z0-9-]+$/.test(key)
    }

    const handeSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        if (!validateKeyFormat(apiKey)) {
            setError('Invalid API key format. Keys should be 72 characters long.')
            return
        }

        setIsLoading(true)

        try {

            let response = await api.post("/user/key/",
                {
                    'api_key': apiKey,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                    credentials: 'include'
                }
            )
            
            console.log(response)

            if (!response.status == 200) {
                const errorData = response.data
                throw new Error(errorData.error || 'Failed to save API key.')
            }

            setSuccess(true)
            setApiKey('')

        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='mt-4 p-4 border rounded'>
            <h3>
                <FiKey className='me-2' />
                Connect your Guild Wars 2 Account.
            </h3>
            <h4>
                Please include the following permissions
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li>Inventories</li>
                    <li>Characters</li>
                    <li>Wallet</li>
                </ul>
            </h4>

            <Form onSubmit={handeSubmit} className='mt-3'>
                <Form.Group controlId="apiKey" className="mb-3">
                    <Form.Control
                        type='password'
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value.trim())}
                        placeholder='Paste your API key here'
                        required
                    />
                    <Form.Text className='text-muted'>
                        <Link
                            to='#'
                            onClick={() => window.open('https://account.arena.net/applications', '_blank')}
                            className='text-decoration-none'
                        >
                            Get your API key <FiExternalLink />
                        </Link>
                        </Form.Text>
                </Form.Group>
                
                {error && <Alert variant='dange'>{error}</Alert>}
                {success && <Alert variant='success'>Key saved successfully!</Alert>}

                <div className='d-flex justify-content-between align-items-center'>
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={isLoading || !apiKey}
                    >
                        {isLoading ? (
                            <>
                                <Spinner
                                    as='span'
                                    animation='border'
                                    size='sm'
                                    role='status'
                                    aria-hidden='true'
                                    className='me-2'
                                />
                                Saving...
                            </> ) : (
                                'Save key'
                            )}
                    </Button>

                    <small className='text-muted'>
                        We will never store your key in plain text.
                    </small>
                </div>
                </Form>
        </div>
    )
}

export default GW2KeyForm