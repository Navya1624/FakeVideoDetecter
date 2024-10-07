import { User } from '../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';


const router = express.Router();
router.use(cookieParser());
router.use(express.json());


router.post("/register", async (req, res) => {
    console.log("navya");
    try {
        const { Username, Email, Password, Contact } = req.body;
        if (!(Username && Email && Password && Contact)) {
            console.log("mandatory field");
            res.status(400).send('All fields are mandatory');
        }

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = new User({
            Username,
            Email,
            Password: hashedPassword,
            Contact
        });

        // Save the user to the database
        await user.save();
        console.log("User Created: ", user);

        const token = jwt.sign({ id: user._id }, 'shhhh', {
            expiresIn: "2h"
        })
        user.token = token;
        return res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
})

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body
//         if (!(email && password)) {
//             res.status(400).send('send all data');
//         }
//         const userExists = await User.findOne("email");
//         if (!userExists) {
//             res.status(404).send('Create a account to login');
//         }
//         if (userExists && await bcrypt.compare(password, User.password)) {
//             const token = jwt.sign(
//                 { id: userExists._id }, 'shhhh', {
//                 expiresIn: "2h"
//             }
//             );
//             userExists.token = token;
//             //send token in cookie
//             const options = {
//                 expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                 httpOnly: true
//             }
//             res.status(200).cookie("token", token, options).json({
//                 success: true,
//                 token,
//                 userExists
//             })
//             res.status(201).json(userExists);
//         }
//         else {
//             res.status(400).send('Invalid credentials');
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Server error');
//     }
// })
export default router;