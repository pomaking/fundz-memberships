MembershipTypes = new Mongo.Collection("membershipTypes");
MembershipTypes.helpers({
	membershipSchema: function(){
		return new SimpleSchema(generateSchema(this._id));
	},
	memberships: function(){
		return Memberships.find({membershipTypeId: this._id});
	}
});

MembershipTypes.attachSchema(new SimpleSchema({
	membershipTypeName: {
		type: String,
		label: "Membership Type Name"
	},
	membershipCost: {
		type: Number,
		label: "Membership Cost"
	},
	membershipPeople: {
		type: [Object],
		label: "Membership People"
	},
	"membershipPeople.$.role": {
		type: String,
		label: "Relation to owner"
	},
	"membershipPeople.$.multipleType": {
		type: String,
		autoform: {
			noselect: true,
			options: [
				{label: "One Max", value: "one"},
				{label: "Two Max", value: "two"},
				{label: "No Max", value: "multi"}
			]
		}
	},
	"membershipPeople.$.isRequired" : {
		type: Boolean,
		label: "Is at least one person required?"
	},
	"membershipPeople.$.askAddress" : {
		type: Boolean,
		label: "Ask for address"
	},
	"membershipPeople.$.isBirthdayRequired": {
		type: Boolean,
		label: "Birthday Required for Account (Children over 13)"
	}
}));
MembershipTypes.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	}
})
function generateSchema(membershipTypeId){
	var membershipType = MembershipTypes.findOne({_id: membershipTypeId});
	var membershipTypeSchema = {
		membershipTypeId: {
			type: String,
			defaultValue: membershipTypeId,
			autoform: {
				afFieldInput:  {
					type:"hidden"
				}
			}
		}
	};
	_.each(membershipType.membershipPeople, function(person){
		var role = person.role;
		var multiType = person.multipleType;
		var isRequired = person.isRequired;
		var roleObj = {};
		roleObj[role] = {};
		roleObj[role].type = (multiType === "one")? Object: [Object];
		roleObj[role].label = role;
		_.extend(membershipTypeSchema, basicInfo("Owner", "one", true));
		_.extend(membershipTypeSchema, roleObj);
		_.extend(membershipTypeSchema, basicInfo(role, multiType, isRequired));
		if(person.askAddress){
			_.extend(membershipTypeSchema, householdDetailsSchema(role, multiType));
		};
		if(person.isBirthdayRequired){
			_.extend(membershipTypeSchema, birthdaySchema(role, multiType));
		};
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
	return (multipleType === "one")?".":".$.";
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

var birthdaySchema = function(role, multipleType){
	var schema = {};
	var rm = role + getMultiple(multipleType);
	schema[rm + "birthday"] = {
		label: "Birthday",
		type: Date
	}
	return schema;
}
var householdDetailsSchema = function(role, multipleType){
	var schema = {};
	var rm = role + getMultiple(multipleType);
	schema[rm + "householdDetails"] = {
		label: "Household Details",
		type: Object
	};
	schema[rm + "householdDetails.mailingAddress"] = {
		label: "Mailing Address",
		type: String
	};
	schema[rm + "householdDetails.city"] = {
		label: "City",
		type: String
	};
	schema[rm + "householdDetails.state"] = {
		label: "State",
		type: String
	};
	schema[rm + "householdDetails.zip"] = {
		label: "Zip",
		type: Number
	};
	return schema;
};
