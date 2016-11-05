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
    it('add_new_empty_product_click_add_button', function () {
        var empty_product = {
            "owner": 1,
            "name": null,
            "size": 0
        };
        // console.log("====");
        // console.log($scope.add_new_product(empty_product, valid = false));
        // console.log("====");
        expect($scope.add_new_product(empty_product, valid = false)).toEqual(true);
        expect($scope.products.length).toEqual(2);
        expect($scope.add_new_product(null, valid = false)).toEqual(true);
        expect($scope.products.length).toEqual(3);
    });
    it('add_new_no_empty_product', function () {
        var product_1_word = {
            "owner": 1,
            "name": "t",
            "size": 0
        };
        var product = {
            "owner": 1,
            "name": "text",
            "size": 0
        };
        expect($scope.add_new_product(product_1_word, valid = true)).toEqual(false);
        expect($scope.products.length).toEqual(1);
        // expect($scope.add_new_product(product, valid = true)).toEqual(false);
        // expect($scope.products.length).toEqual(2);
    });
});
