describe('Products', function () {
    var scope;

    beforeEach(angular.mock.module('Application'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('main_site', {$scope: scope});
    }));


    it('add_new_product_to_list', function () {

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
    it('del_new_product', function () {
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
        scope.del_new_product();
        expect(scope.products).toEqual([
            {
                "name": "",
                "size": 0

            }
        ])

    });
});
