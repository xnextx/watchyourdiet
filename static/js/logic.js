var Application = angular.module('Application', []).config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'; //Elements for Django
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
});

Application.controller('Test', [ '$scope', '$http', function ($scope, $http) {

    $scope.teste = "";

}]);
