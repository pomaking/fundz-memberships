Template.membershipWizTwo.helpers({
	additionalPeopleSchema: function(){
		return new SimpleSchema({name: {
			type: String,
			label: "name"
		}});
	}
})