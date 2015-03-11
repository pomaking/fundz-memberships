Template.membershipWizOne.helpers({
	ownerRoleSchema: function(){
		return Router.current().data().membershipType().ownerSchema();
	},
	selectedRoleSchema: function(){
		return Router.current().data().membershipType().ownerSchema();
	}
});