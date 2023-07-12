import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    passwordHash: {
        type: String,
        required: true,
        default: ''
    },
    username: {
        type: String,
        required: true,
        unique: true,
        default: ''
    }
});

const AccountModel = mongoose.model('Account', accountSchema);

export default AccountModel;
