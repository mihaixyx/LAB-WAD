var mongoose = require('mongoose')

var LeaderboardSchema = new mongoose.Schema({
	lid:{
		type:Number,
		required: true
	},
	username:{
		type:String,
		required: true
	},
	score:{
		type:Number,
		required: true
	}
});

const Score = module.exports = mongoose.model('Score', LeaderboardSchema);

module.exports.addScore = function(newScore, callback){
	newScore.save(callback);
}

module.exports.getScores = function(callback){
	Score.find({}, '-_id username score').sort({score: 'desc'}).exec(function(err, scores){
		if(err){
			callback(err,null);
		}else{
			callback(null,scores);
		}
	})
}

module.exports.getScoresById = function(id,callback){
	Score.find({lid:id}, '-_id username score').sort({score: 'desc'}).exec(function(err, scores){
		if(err){
			callback(err,null);
		}else{
			callback(null,scores);
		}
	})
}