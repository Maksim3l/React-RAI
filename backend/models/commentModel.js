var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var commentSchema = new Schema({
	'text' : String,
	'postedBy' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
   },
   postedOn: {
	   type: Date,
	   default: Date.now 
	 },
	'photoId' : {
		type: Schema.Types.ObjectId,
		ref: 'photo'
   },
	'likes' : Number
});

module.exports = mongoose.model('comment', commentSchema);
