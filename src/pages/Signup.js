import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button } from '@mui/material'


const Signup = () => {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit(data) {
        console.log("submitting the form", data);
        const response = await axios.post(`http://localhost:5000/api/auth/register`, 
                data
        );
        console.log(response.data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username</label>
                <input
                    className={errors.Username ? 'input-error' : ""}
                    {...register('Username',
                        {
                            required: true,
                            minLength: { value: 5, messgae: "Min length almost 5" },
                            maxLength: { value: 20, message: "Max length almost 20" }
                        })} />
                {errors.Username && <p className='error-msg'>{errors.Username.message}</p>}
            </div>
            <br />

            <div>
                <label>Email</label>
                <input
                    className={errors.Email ? 'input-error' : ""}
                    {...register('Email', {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
                    })} />
            </div>
            <br />

            <div>
                <label>Password</label>
                <input
                    type="password"
                    className={errors.password ? 'input-error' : ""}
                    {...register("Password", {
                        required: "Password is required",
                        pattern: /^[A-Za-z]+$/i,
                        message: "Password can only contain letter",
                    })} />
                {errors.password && <p className='error-msg'>{errors.password.message}</p>}
            </div>
            <br />

            <div>
                <label>Contact</label>
                <input
                    type="tel"
                    className={errors.Contact ? 'input-error' : ""}
                    {...register('Contact')} />
            </div>
            <br />
            <input type='submit' disabled={isSubmitting}
                value={isSubmitting ? "Submitting" : "Register"} />
        </form>
    )

    // const Register = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(`http://localhost:5000/register`, {
    //             username,
    //             email,
    //             password,
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error during registration: ', error);
    //     }
    // }
    // return (
    //     <div>
    //         <h1>Welcome</h1>
    //         <form onSubmit = { Register}>
    //             <TextField
    //                 placeholder='Username'
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 fullWidth
    //             />
    //             <TextField
    //                 placeholder='Email'
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 fullWidth
    //             />
    //             <TextField
    //                 type='password'
    //                 placeholder='Password'
    //                 value={password}
    //                 onChange ={(e) => setPassword(e.target.value)}
    //                 fullWidth
    //             />
    //             <Button type="submit">
    //                 Create Account
    //             </Button>
    //         </form>
    //     </div>
    // )
}



export default Signup
