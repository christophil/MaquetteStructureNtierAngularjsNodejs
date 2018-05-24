'use strict';

describe('Controller: PeriodeFormulaireCtrl', function () {

  // load the controller's module
  beforeEach(module('testmaquetteApp'));

  var PeriodeFormulaireCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeriodeFormulaireCtrl = $controller('PeriodeFormulaireCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PeriodeFormulaireCtrl.awesomeThings.length).toBe(3);
  });
});
