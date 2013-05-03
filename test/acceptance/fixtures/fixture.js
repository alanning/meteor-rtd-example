(function () {
  "use strict";

  var createRoute;

  createRoute = function(route, handler) {
    __meteor_bootstrap__.app.stack.splice(0, 0, {
      route: '/' + route,
      handle: function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        handler(req, res);
        res.end(route + ' complete');
      }.future()
    });
  };

  Meteor.startup(function () {

    createRoute('reset', function() {
      // clear database
    });

  });  // end Meteor.startup

})();
