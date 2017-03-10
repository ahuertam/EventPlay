const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../user/user.model');

const eventSchema = new mongoose.Schema({
  name: { type: String, require: true },
  tokenAccess: {type: String, default: "" },
  description: { type: String, required: true },
    tag: { type: [String], required: false },
  // _creator : { type: Schema.Types.ObjectId, ref: 'User'},
  imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"},
  location: { type: { type: String }, coordinates: [Number] ,default:"" },
  state : {type:Boolean,default: false ,required: true},
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Event', eventSchema);
