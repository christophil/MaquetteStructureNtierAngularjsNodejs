'use strict';

describe('Controller: DateCtrl', function () {

  // load the controller's module
  beforeEach(module('testmaquetteApp'));

  var DateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DateCtrl = $controller('DateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DateCtrl.awesomeThings.length).toBe(3);
  });
});
