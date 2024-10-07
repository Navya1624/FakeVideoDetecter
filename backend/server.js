import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'
import authenticationRoutes from './routes/authentication.js';



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace <db_uri> with your MongoDB connection string)
mongoose.connect('mongodb+srv://ahmadsaba729:A62ygaIzZ5nIIgch@cluster0.36tkk.mongodb.net/FakeVideoDetection', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authenticationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});