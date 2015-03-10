MembershipTypes = new Mongo.Collection("membershipTypes");
MembershipTypes.helpers({
	membershipSchema: function(){
		return new SimpleSchema(this.schema);
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
	},
	schema: {
		type: Object,
		optional: true,
		label: "Schema (this is generated later)"
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
