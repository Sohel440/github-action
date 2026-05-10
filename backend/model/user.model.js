import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    Emp_id: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = mongoose.model('User', userSchema);
export default User;
