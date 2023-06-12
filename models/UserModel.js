import mongoose from 'mongoose';
import validator from "validator/es";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide firstname'],
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Please provide lastname'],
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6,
        select: false
    },
    
});

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

UserSchema.methods.comparePassword = async function(canditatePassword) {
    return await bcrypt.compare(canditatePassword, this.password);
}



export default mongoose.model('User', UserSchema);