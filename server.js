import express from 'express';
import { users } from './data.js';

const app = express();
app.use(express.json());

app.get('/user', (req, res) => {
    const userQuery = req.query.user;

    if (!userQuery || userQuery.trim() === '') {
        return res.status(400).json({ message: 'User parameter cannot be empty.'});
    }

    const userFound = users.find(u => u.username.toLowerCase() === userQuery.toLowerCase());

    if (userFound) {
        return res.json({ message: 'User found.', data: userFound });
    } else {
        return res.status(404).json({ message: 'User not found.' });
    }
});

app.put('/user', (req, res) => {
    const userQuery = req.query.user;

    if (!userQuery || userQuery.trim() === '') {
        return res.status(400).json({ message: 'User parameter cannot be empty' });
    }

    const { name, email } = req.body;

    const index = users.findIndex(u => u.username.toLowerCase() === userQuery.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    if (name) users[index].name = name;
    if (email) users[index].email = email;

    return res.json({ message: 'User updated.', data: users[index] });
});

app.delete('/user', (req, res) => {
    const userQuery = req.query.user;

    if (!userQuery || userQuery.trim() === '') {
        return res.status(400).json({ message: 'User parameter cannot be empty.' });
    }

    const index = users.findIndex(u => u.username.toLowerCase() === userQuery.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const removedUser = users.splice(index, 1);

    return res.json({ message: 'User deleted.', data: removedUser[0] });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});