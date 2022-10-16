import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlenght: 6 },
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
