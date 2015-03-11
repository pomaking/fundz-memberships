Meteor.methods({
	addMember : function(data){
		var membershipId = Memberships.insert({
			membershipTypeId: data.membershipTypeId,
			dateCreated: new Date()
		});
		var keysArray = _.without(_.keys(data), "membershipTypeId");
		_.each(keysArray, function(key){
			var memberObj = {membershipId: membershipId, role: key};
			_.extend(memberObj, data[key]);
			Members.insert(memberObj);
		});
	}
})