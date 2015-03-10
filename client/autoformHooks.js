AutoForm.hooks({
	insertMembershipType: {
		after: {
			insert: function(error, result){
				var schema = generatedSchema(result);
				console.log(schema);
				MembershipTypes.update({_id: result}, {$set: {schema: schema}});
			}
		}
	}
});

function generatedSchema(membershipTypeId){
	var membershipType = MembershipTypes.findOne({_id: membershipTypeId});
	var membershipTypeSchema = {};
	_.each(membershipType.membershipPeople, function(person){
		var role = person.role;
		var multiType = person.multipleType;
		var isRequired = person.isRequired;
		var roleObj = {};
		roleObj.type = (multiType === "one")? Object: [Object];
		roleObj.label = role;
		membershipTypeSchema[role] = roleObj;
		_.extend(membershipTypeSchema, basicInfo(role, multiType, isRequired));
	});
	return membershipTypeSchema;
}

function basicInfo(role, multipleType, isRequired) {
	var schema = {};
	schema[role + getMultiple(multipleType) + "firstName"] = {
		type: String,
		label: "First Name"
	};
	schema[role + getMultiple(multipleType) + "lastName"] = {
		type: String,
		label: "Last Name"
	};
	return schema;
}
function getMultiple(multipleType){
	return (multipleType === "one")?"":".$.";
}
function getMinMax(multipleType, isRequired){
	var minMaxObj = {};
	if (multipleType === "two"){
		minMaxObj.max = 2;
	}
	if(isRequired && multipleType !== "one"){
		minMaxObj.min = 1;
	}
	if(!isRequired && multipleType === "one"){
		minMaxObj.optional = true;
	}
	else if(!isRequired && multipleType !== "one"){
		minMaxObj.min = 0;
	}
	return minMaxObj;
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