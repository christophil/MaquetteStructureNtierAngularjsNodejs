'use strict';

describe('Controller: MatriceCtrl', function () {

  // load the controller's module
  beforeEach(module('testmaquetteApp'));

  var MatriceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatriceCtrl = $controller('MatriceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MatriceCtrl.awesomeThings.length).toBe(3);
  });
});
