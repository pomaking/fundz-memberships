AutoForm.hooks({
  addMembersForm: {
    before: {
      method: function(doc) {
        doc.membershipTypeId = this.docId;
      //  this.result(doc);
        return doc;
      }
    }
  }
});