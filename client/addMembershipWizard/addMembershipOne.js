Template.membershipWizOne.helpers({
	ownerSchema: function(){
		return new SimpleSchema({name: {
			type: String,
			label: "name"
		}});
	}
})