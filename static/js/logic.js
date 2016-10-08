var Application = angular.module('Application', []).config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'; //Elements for Django
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
});

Application.controller('main_site', ['$scope', '$http', function ($scope, $http) {
    $scope.products = [{
        "name": "sdsd",
        "size": 0
    }];

    function check_many_products() {
        return $scope.products.length;
    };

    $scope.add_new_product = function () {
        $scope.products.push({
            "name": "",
            "size": 0
        })
    };

    $scope.del_new_product = function () {
        if (check_many_products() > 1) {
            $scope.products.pop();
        }

    };
    $scope.teste = "";

}]);
