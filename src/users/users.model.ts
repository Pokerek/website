import mongoose from 'mongoose';
import creatorSchema from './creator.schema';
import User from './user.interface';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  creator: creatorSchema
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
