const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String},
  // name: { type: String, require: true },
  // email: { type: String, require: true },
  password: { type: String }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
