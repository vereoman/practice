const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
};

const validateName = (name) => {
    const nameRegex = /^[A-Za-z ]+$/;
    return nameRegex.test(name);
};

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    if (!password) {
        return res.status(400).json({ error: "Password cannot be empty" });
    }
    return res.json({ message: "Login successful" });
});

app.post('/signup', (req, res) => {
    const { name, email, password, dateOfBirth } = req.body;

    if (!name || !validateName(name)) {
        return res.status(400).json({ error: "Invalid name format. Only letters and spaces are allowed." });
    }
    if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    if (!password || !validatePassword(password)) {
        return res.status(400).json({ error: "Password must be 8-16 characters long, contain at least one uppercase, one lowercase, one number, and one special character." });
    }
    users.push({ name, email, password, dateOfBirth });
    return res.json({ message: "User registered successfully" });
});

app.get('/user', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: "User parameter cannot be empty" });
    }
    const user = users.find((u) => u.name.toLowerCase() === username.toLowerCase());
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User found", data: user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
