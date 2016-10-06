var Application = angular.module('Application', []).config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'; //Elementy dla Django
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
});

Application.controller('Test', [ '$scope', '$http', function ($scope, $http) {


    $scope.teste = "TEST";
}]);
