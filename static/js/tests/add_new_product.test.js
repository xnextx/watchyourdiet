describe('Users factory', function () {
    var scope;

    beforeEach(angular.mock.module('Application'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('main_site', {$scope: scope});
    }));


    it('add new product', function () {

        scope.add_new_product("one_product");

        expect(scope.products).toEqual([
            {
                "name": "",
                "size": 0
            },
            {
                "name": "",
                "size": 0
            }
        ]);
    });
});
