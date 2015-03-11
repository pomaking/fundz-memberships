MembershipTypes = new Mongo.Collection("membershipTypes");
MembershipTypes.helpers({
	membershipSchema: function(){
		return new SimpleSchema(generateSchema(this._id));
	},
	memberships: function(){
		return Memberships.find({membershipTypeId: this._id});
	},
	roles: function(){
		var rolesArray = [];
		_.each(this.membershipPeople, function(person){
			rolesArray.push({role: person.role, canBeOwner: person.canBeOwner});
		})
		return rolesArray;
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
		label: "Role"
	},
	/*"membershipPeople.$.isSingle": {
		type: Boolean,
		label: "Only One Person"
	},*/
	"membershipPeople.$.min": {
		type: Number,
		label: "Min People",
		optional: true
	},
	"membershipPeople.$.max": {
		type: Number,
		label: "Max people",
		optional: true
	},
	"membershipPeople.$.isRequired" : {
		type: Boolean,
		label: "Is at least one person required?"
	},
	"membershipPeople.$.isAddressRequired" : {
		type: Boolean,
		label: "Is an address required?"
	},
	"membershipPeople.$.isBirthdayRequired": {
		type: Boolean,
		label: "Is a birthday required?"
	},
	"membershipPeople.$.canBeOwner": {
		type: Boolean,
		label: "Can this role sign up for memberships?"
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
		//_.extend(membershipTypeSchema, basicInfo("Owner", "one", true));
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
	var rm = role + getMultiple(multipleType);
	schema[rm + "firstName"] = {
		type: String,
		label: "First Name"
	};
	schema[rm + "lastName"] = {
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
