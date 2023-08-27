const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    fullname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false // Default value is false for normal users
    },
})

// Middleware to hash the password before saving
// call the save method
userSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.passwordHash, salt);
        this.passwordHash = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.passwordHash);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema)