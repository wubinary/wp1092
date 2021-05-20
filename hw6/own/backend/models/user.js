import mongoose from 'mongoose';
// import User from 'models/user.js';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	id: Number,
	name: String
});
const User = mongoose.model('User', UserSchema);

export default User;
