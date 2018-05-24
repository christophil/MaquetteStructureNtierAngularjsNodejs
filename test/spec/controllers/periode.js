'use strict';

describe('Controller: PeriodeCtrl', function () {

  // load the controller's module
  beforeEach(module('testmaquetteApp'));

  var PeriodeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeriodeCtrl = $controller('PeriodeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PeriodeCtrl.awesomeThings.length).toBe(3);
  });
});
