const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('../event/event.model');

const participantSchema = new mongoose.Schema({
  name: { type: String, require: true },
  _event : { type: Schema.Types.ObjectId, ref: 'Event'},
  imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"},
  active : {type:Boolean,default: true ,required: true},
  points: { type: Number, default:0,require: true },
  textComment1: { type: String, default: ""},
  textComment2: { type: String, default: ""},
  textComment3: { type: String, default: ""}
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('participant', participantSchema);
