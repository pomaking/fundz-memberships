/*AutoForm.hooks({
  insertMembershipType: {
    before: {
      insert: function(doc) {
      	var rolesArray = [];
        _.each(doc.membershipPeople, function(person){
        	rolesArray.push({role: person.role, canBeOwner: person.canBeOwner});
        });
        doc.roles = rolesArray;
        console.log(doc.roles);
        return doc;
      }
    }
  }
});*/