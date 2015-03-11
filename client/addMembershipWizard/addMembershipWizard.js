Template.addMembershipWiz.helpers({
  routeParams: function(){
    return {_id: Router.current().getParams()._id};
  },
  steps: function(){
    return [{
      id: 'owner-information',
      title: 'Membership Owner Information',
      template: 'membershipWizOne',
      formId: "membership-wiz-one"
    }, {
      id: 'other-members',
      title: 'Additional People Information',
      template: 'membershipWizTwo',
      formId: 'membership-wiz-two',
      onSubmit: function(data, wizard) {
        console.log(data, wizard);
        /*var ptaId = PTAs.insert(wizard);
        Meteor.call("addUserToPTA", data.username, data.password, ptaId, function(){
          Meteor.loginWithPassword(data.username, data.password, function(){
            Router.go("orgDashboard", {_id: ptaId});
          })
        });*/
      }
    }
  ]},
  
});