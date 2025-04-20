var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
	'title': String,
	'comment': String,
	'path': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	postedOn: {
		type: Date,
		default: Date.now
	},
	'views': Number,
	'likes': Number
});

module.exports = mongoose.model('photo', photoSchema);
