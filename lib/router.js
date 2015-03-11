Router.configure({
	layoutTemplate: "mainLayout"
})

Router.route('/', {
	name: "addMembershipType"
});
Router.route('/add-membership/:_id', {
	name:"addMembership",
	data: function(){
		var self = this;
		return {
			membershipType: MembershipTypes.findOne({_id: self.params._id})
		}
	}
})
Router.route("/list-memberships-types", {
	name: "listMembershipsTypes",
	waitOn: function(){
		return Meteor.subscribe("membershipTypes");
	},
	data: function(){
		return {
			membershipTypes: MembershipTypes.find({}).fetch()
		}
	}
});
Router.route("/list-memberships/:_id", {
	name: "listMemberships",
	//waitOn: func
	data: function(){
		var self = this;
		return {
			membershipType: MembershipTypes.findOne({_id: self.params._id})
		}
	}
})