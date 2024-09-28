import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TextField, Button } from '@mui/material'


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Register = async () => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/register`, {
                username,
                email,
                password,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error during registration: ', error);
        }
    }
    return (
        <div>
            <h1>Welcome</h1>
            <form onSubmit = { Register}>
                <TextField
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                <TextField
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange ={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Button type="submit">
                    Create Account
                </Button>
            </form>
        </div>
    )
}

export default Signup
