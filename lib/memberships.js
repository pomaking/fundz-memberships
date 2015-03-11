Memberships = new Mongo.Collection("memberships");

Memberships.helpers({
	members: function(){
		return Members.find({membershipId: this._id});
	}
});