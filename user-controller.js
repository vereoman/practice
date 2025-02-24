const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' })
        }

        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong:', error:error.message });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        res.json({ message: 'Login successful.' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong;', error:error.message });
    }
};
