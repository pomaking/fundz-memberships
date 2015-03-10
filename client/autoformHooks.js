AutoForm.hooks({
	insertMembershipType: {
		after: {
			insert: function(error, result){
				var schema = generatedSchema(result);
				MembershipTypes.update({_id: result}, {$set: {schema: schema}});
			}
		}
	}
});

function generatedSchema(membershipTypeId){
	var membershipType = MembershipTypes.findOne({_id: membershipTypeId});
	var membershipTypeSchema = {};
	_.each(membershipType.membershipPeople, function(person){
		_.extend(membershipTypeSchema, pesonalInformationSchema(membershipType.role));
	});
	//if(membershipType.required)
	return membershipTypeSchema;
}

function personalInformationSchema(role) {
	var schema = {};
	schema[role + ".$.firstName"] = {
		type: String,
		label: "First Name"
	};
	schema[role + ".$.lastName"] = {
		type: String,
		label: "Last Name"
	};
	return schema;
}

var houseHoldDetailsSchema = {
	householdDetails: {
		label: "Household Details",
		type: Object
	},
	"householdDetails.mailingAddress" : {
		label: "Mailing Address",
		type: String
	},
	"householdDetails.city" : {
		label: "City",
		type: String
	},
	"householdDetails.state" : {
		label: "State",
		type: String
	},
	"householdDetails.zip" : {
		label: "Zip",
		type: Number
	}
};