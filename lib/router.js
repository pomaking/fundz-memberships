Router.configure({
	layoutTemplate: "mainLayout"
})

Router.route('/', {
	name: "addMembershipType"
});
Router.route('/add-members/:_id', {
	name:"addMembers",
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
});
Router.route("/list-members/:_id", {
	name: "listMembers",
	//waitOn: func
	data: function(){
		var self = this;
		return {
			memebershipType: MembershipType.find({_id: self.params._id}),
			members: Members.find({})
		}
	}
})