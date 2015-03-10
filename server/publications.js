Meteor.publish('membershipTypes', function(){
  return MembershipTypes.find({});
});