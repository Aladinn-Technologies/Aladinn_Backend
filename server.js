require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Import routes
const authRoutes = require('./routes/auth');
const projectCardRoutes = require('./routes/projectCard');


const app = express();
const PORT = process.env.PORT || 5000;


//Middleware
app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Database connected successfully!!!')).catch(err => console.log('Database connection error:', err));


//Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/project-cards', projectCardRoutes);

app.get('/', (req, res) => {
    res.send('Backend server is running!!!');
});


//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});