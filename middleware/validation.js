const validateRegistration = (req, res, next) => {
    const { username, email, password, fullName, gender, dateOfBirth, country } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password validation (min 8 chars, at least one number and one letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: 'Password must be at least 8 characters long and contain at least one letter and one number' 
        });
    }

    // Other field validations
    if (!username || username.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    if (!fullName || fullName.length < 2) {
        return res.status(400).json({ message: 'Full name is required' });
    }

    if (!['male', 'female', 'other'].includes(gender)) {
        return res.status(400).json({ message: 'Invalid gender value' });
    }

    if (!dateOfBirth || isNaN(new Date(dateOfBirth))) {
        return res.status(400).json({ message: 'Invalid date of birth' });
    }

    if (!country || country.length < 2) {
        return res.status(400).json({ message: 'Country is required' });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    next();
};

module.exports = {
    validateRegistration,
    validateLogin
};