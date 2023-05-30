import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface Post {
  title: string;
  createdDate: Date;
  text: string;
  tags: string[];
}

type PostDocument = Post & mongoose.Document;

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

const postModel = mongoose.model<PostDocument>('Post', postSchema);

export default postModel;
export { Post };
