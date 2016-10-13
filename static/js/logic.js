var Application = angular.module('Application', []).config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'; //Elements for Django
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
});

Application.controller('main_site', ['$scope', '$http', 'Dev', function ($scope, $http, Dev) {
    $scope.products = [{
        "name": "",
        "size": 0
    }];

    function check_many_products() {
        return $scope.products.length;
    };

    $scope.add_new_product = function (content) {

        if (content.length == 1) {

            $scope.products.push({
                "name": "",
                "size": 0
            })
        }
    };

    $scope.del_new_product = function () {
        if (check_many_products() > 1) {
            $scope.products.pop();
        }

    };


    //
//*****************************************
//
//    Developer Version
//
//*****************************************

    // Dev.SendTestData();
    // Dev.DeleteTestData(20);

}]);


Application.factory('Dev', ['$http', function ($http) {


    return {
        SendTestData: function () {
            $http.post("/api/v1/MyMeal/", {
                "owner": 1,
                "product": [], //TODO: Dlaczego dając [] wysyła się poprawnie, a cokolwiek innego już nie? nie chce tak!
                "name": "test"

            });
        },
        DeleteTestData: function (pk) {
            $http.delete(`/api/v1/MyMeal/${pk}`)
        }
    };
}]);