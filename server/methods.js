Meteor.methods({
	addMembership : function(data){
		var membershipId = Memberships.insert({
			membershipTypeId: data.membershipTypeId,
			dateCreated: new Date()
		});
		var keysArray = _.without(_.keys(data), "membershipTypeId");
		_.each(keysArray, function(key){
			if(Array.isArray(data[key])){
				_.each(data[key], function(person){
					var memberObj = {membershipId: membershipId, role: key};
					_.extend(memberObj, person);
					console.log(memberObj);
					Members.insert(memberObj);
				})
			}
			else { 
				var memberObj = {membershipId: membershipId, role: key};
				_.extend(memberObj, data[key]);
				Members.insert(memberObj);
			}
		});
	}
})