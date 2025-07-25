const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });
        await user.save();

        const payload = { user: {id: user.id }};
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'}, (err, token) => {
            if(err) throw err;
            res.status(201).json({ token, message: 'User registered successfully!' });
        });
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id }};
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, message: 'Logged in successfully!' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};