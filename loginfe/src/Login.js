import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavCustom from './NavCustom';
import './App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ token, setToken, displayName, setDisplayName, setSearchTerm }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', {
                username,
                password
            });
            setToken(response.data?.token)
            localStorage.setItem('token', response.data?.token);
            setDisplayName(username)
            localStorage.setItem('displayName', username);
            localStorage.setItem('ID', response.data?.id)
            setUsername('');
            setPassword('');
            navigate("/user")
        } catch (error) {
            console.error('Error login for user:', error);
        }
      }

    return (
        <>
        <NavCustom token={token} username={displayName} setSearchTerm={setSearchTerm} />
        <div className='form-center'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
        </>
      );
}

export default Login;