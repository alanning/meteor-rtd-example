Meteor.autorun = function (func) {
  func();
};
Meteor.user = function () {
  return {
    emails: [
    { address: "test@example.com", verified: true }
    ]
  };
};

Deps = {
  autorun: function (func) {
    func();
  }
};
