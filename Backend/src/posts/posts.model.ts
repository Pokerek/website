import mongoose from 'mongoose';
import Post from './post.interface';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  },
  tags: [String]
});

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);
export default postModel;
