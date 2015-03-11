Members = new Mongo.Collection("members");

Members.helpers({
	profileData: function(){
		var self = this;
		var keys = _.without(_.keys(this), "_id", "membershipId", "role", "firstName", "lastName");
		var profileArray = [];
		_.each(keys, function(key){
			profileArray.push({name: key, value: self[key]});
		});
		return profileArray;
	}
})