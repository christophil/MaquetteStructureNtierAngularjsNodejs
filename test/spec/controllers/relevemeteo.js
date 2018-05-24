'use strict';

describe('Controller: RelevemeteoCtrl', function () {

  // load the controller's module
  beforeEach(module('testmaquetteApp'));

  var RelevemeteoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RelevemeteoCtrl = $controller('RelevemeteoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RelevemeteoCtrl.awesomeThings.length).toBe(3);
  });
});
