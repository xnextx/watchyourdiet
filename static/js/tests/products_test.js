var $scope = {};
beforeEach(angular.mock.module('Application'));

beforeEach(angular.mock.inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('main_site', {$scope: $scope});
}));

describe('Tools', function () {
    it('is_empty', function () {
        expect($scope.is_empty("s")).toEqual(false);
        expect($scope.is_empty()).toEqual(true);
        expect($scope.is_empty("")).toEqual(true);
        expect($scope.is_empty(null)).toEqual(true);
        expect($scope.is_empty(undefined)).toEqual(true);

    });

});
describe('Products', function () {
    it('reset_function', function () {
        var product_1_char = {
            "owner": 1,
            "name": "t",
            "size": 0
        };
        //init
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(3);
        //test
        expect($scope.products.length).toEqual(3);
        expect($scope.reset()).toEqual(true);
        expect($scope.products.length).toEqual(1);
    });
    it('add_new_empty_product_click_add_button', function () {
        var empty_product = {
            "owner": 1,
            "name": null,
            "size": 0
        };
        var product = {
            "owner": 1,
            "name": "text",
            "size": 0
        };
        // console.log("====");
        // console.log($scope.add_new_product(empty_product, valid = false));
        // console.log("====");
        expect($scope.add_new_product(empty_product, valid = false)).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(null, valid = false)).toEqual(true);
        expect($scope.products.length).toEqual(3);
        expect($scope.add_new_product(product, valid = false)).toEqual(true);
        expect($scope.products.length).toEqual(4);
    });
    it('add_new_no_empty_product', function () {
        var product_1_char = {
            "owner": 1,
            "name": "t",
            "size": 0
        };
        var product_2_char = {
            "owner": 1,
            "name": "te",
            "size": 0
        };
        var product_3_char = {
            "owner": 1,
            "name": "tex",
            "size": 0
        };
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(product_2_char, true)).toEqual(false);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(product_3_char, true)).toEqual(false);
        expect($scope.products.length).toEqual(2);

    });
    it('del_last_product', function () {
        var product_1_char = {
            "owner": 1,
            "name": "t",
            "size": 0
        };
        //init
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(3);
        //test
        expect($scope.del_last_product()).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.del_last_product()).toEqual(true);
        expect($scope.products.length).toEqual(1);
        expect($scope.del_last_product()).toEqual(false);
        expect($scope.products.length).toEqual(1);
    });
    it('del_new_product', function () {
        var product_1_char = {
            "owner": 1,
            "name": "t",
            "size": 0
        };
        //init
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(product_1_char, true)).toEqual(true);
        expect($scope.products.length).toEqual(3);
        //test
        expect($scope.products.length).toEqual(3);
        expect($scope.del_new_product($scope.products[0])).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.del_new_product($scope.products[0])).toEqual(true);
        expect($scope.products.length).toEqual(1);
        expect($scope.del_new_product($scope.products[0])).toEqual(false);
        expect($scope.products.length).toEqual(1);
    });
});
