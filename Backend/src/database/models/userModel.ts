import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface User {
  username: string;
  password: string;
  email: string;
}

type UserDocument = User & mongoose.Document;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, unique: true }
});

const userModel = mongoose.model<UserDocument>('User', userSchema);

export default userModel;
export { User };
