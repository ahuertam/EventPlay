const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('../event/event.model');

const tournamentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  type:{ type: String, require: true },
  _event : { type: Schema.Types.ObjectId, ref: 'Event'},
  completed : {type:Boolean,default: false ,required: true},
  // phase: {
  //   phase:Number,
  //   pairings:[]
  // },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
