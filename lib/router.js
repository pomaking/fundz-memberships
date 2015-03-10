Router.configure({
	layoutTemplate: "mainLayout"
})

Router.route('/', {
	name: "addMembershipType"
});
Router.route('/add-member/:_id', {
	name:"addMember",
	data: function(){
		var self = this;
		return {
			membershipType: MembershipTypes.findOne({_id: self.params._id})
		}
	}
})
Router.route("/list-memberships", {
	name: "listMemberships",
	waitOn: function(){
		return Meteor.subscribe("membershipTypes");
	},
	data: function(){
		return {
			membershipTypes: MembershipTypes.find({}).fetch()
		}
	}
})