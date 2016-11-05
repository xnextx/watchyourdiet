'use strict';

var Application = angular.module('Application', []).config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'; //Elements for Django
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

Application.controller('main_site', ['$scope', '$http', 'Dev', 'Database', 'Toast', function ($scope, $http, Dev, Database, Toast) {
    var max_products = 10;
    $scope.products = [{
        "owner": 1,
        "name": null,
        "size": 0
    }];
    $scope.mymeal = [{
        "owner": 1,
        "name": null,
        "product": $scope.products
    }];

    //*****************************************
    //
    //    Tools
    //
    //*****************************************
    $scope.reset = function () {
        $scope.products = [{
            "owner": 1,
            "name": null,
            "size": 0
        }];
        $scope.mymeal = [{
            "owner": 1,
            "name": null,
            "product": $scope.products
        }];
        Toast.Show([true, "Zresetowano formularz."]);
    };
    $scope.is_empty = function (value) {
        return value == "" || value == null || value == undefined;
    };
    //*****************************************
    //
    //    End Tools
    //
    //*****************************************

    $scope.send_mymeal = function (mymeal) {
        //TODO: Można to poprawić, obiekt validatora powinien tylko validować obiekt, a nie przy okazji wywoływać jego skasowanie
        ////////////////////
        // Validator
        ////////////////////
        $scope.validator = function (mymeal) {
            var report = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if ($scope.is_empty(mymeal.name)) {
                return [false, 'Nie podano nazwy posiłku.'];
            }
            var x = mymeal.product.length;
            while (x--) {
                if (mymeal.product.length == 1) {
                    if ($scope.is_empty(mymeal.product[x].name)) {
                        return [false, "Nie podano nazwy żadnego produktu."];
                    }
                } else if ($scope.is_empty(mymeal.product[x].name) && report == false) {
                    $scope.del_new_product(mymeal.product[x]);
                }
            }
            return true;
        };
        ////////////////////
        // End Validator
        ////////////////////

        if ($scope.validator(mymeal) == true) {
            var success = function success(response) {
                console.log("Sukces");
                Toast.Show([true, "Dodano nowy posiłek."]);
                $scope.reset();
            };
            var error = function error(reason) {
                Toast.Show([false, "Błąd podczas wysyłania posiłku."]);
            };
            Database.Send(mymeal).then(success, error);
        } else {
            Toast.Show($scope.validator(mymeal, false));
        }
    };

    $scope.add_new_product = function (product) {
        var valid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


        ////////////////////
        // Validator
        // product -> product
        // valid -> whether the product has to pass validation
        // report -> only information about validation result
        ////////////////////
        $scope.validator = function (product, valid) {
            var report = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (valid == true) {

                var product_name_lenght;
                try {
                    product_name_lenght = product.name.length;
                } catch (err) {
                    product_name_lenght = 0;
                }

                if (!$scope.is_empty(product.name) && product_name_lenght <= 1) {
                    if ($scope.products[$scope.products.length - 1].name != null) {
                        for (var x in $scope.products) {
                            if ($scope.is_empty($scope.products[x].name)) {
                                return [false, null];
                            } else {}
                        }
                        return [true, null];
                    } else {
                        // $scope.products[$scope.products.length - 1].name = product.name;
                        // $scope.products[$scope.products.length - 1].size = product.size;
                        for (var x in $scope.products) {
                            if ($scope.is_empty($scope.products[x].name)) {
                                return [false, null];
                            } else {}
                        }
                        return [true, null];
                    }
                }
                // else if (!$scope.is_empty(product.name) && product_name_lenght > 1) {
                //     return [false, "Nazwa produktu jest pusta oraz długość nazwy jest większa od 1"];
                // }
                else if (product_name_lenght == 0 && report == false) {
                        $scope.del_new_product(product);
                        return [false, null];
                    } else {
                        return [false, null];
                    }
            } else {
                return [true, "Walidacja została wyłączona."];
            }
        };
        ////////////////////
        // End Validator
        ////////////////////
        if ($scope.validator(product, valid)[0] == true) {
            if ($scope.products.length < max_products) {
                //Materialize bug value tip
                $(document).ready(function () {
                    Materialize.updateTextFields();
                });
                $scope.products.push({
                    "owner": 1,
                    "name": null,
                    "size": 0
                });
                return true;
            } else {
                Toast.Show([false, 'Maksymalna ilo\u015B\u0107 produkt\xF3w w posi\u0142ku to ' + max_products]);
                return false;
            }
        } else {
            Toast.Show($scope.validator(product, valid, true));
            return false;
        }
    };

    $scope.del_last_product = function () {
        if ($scope.products.length > 1) {
            $scope.products.pop();
        }
    };
    $scope.del_new_product = function (product) {
        if ($scope.products.length > 1) {
            var id = $scope.products.indexOf(product);
            $scope.products.splice(id, 1);
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
Application.factory('Toast', [function () {
    return {
        Show: function Show(reason) {
            if (reason[1] != null) {
                Materialize.toast(reason[1], 4000);
                console.log('Toast: ' + reason[0] + ' - ' + reason[1]);
            }
        }
    };
}]);
Application.factory('Database', ['$http', function ($http) {
    // this.Send = function (mymeal) {
    //     return $http.post("/api/v1/MyMeal/", mymeal);
    // };
    return {
        Send: function Send(mymeal) {
            return $http.post("/api/v1/MyMeal/", mymeal);
        }
    };
}]);
Application.factory('Dev', ['$http', function ($http) {
    return {
        SendTestData: function SendTestData() {
            $http.post("/api/v1/MyMeal/", {
                "owner": 1,
                "product": [], //TODO: Dlaczego dając [] wysyła się poprawnie, a cokolwiek innego już nie? nie chce tak!
                "name": "test"
            });
        },
        DeleteTestData: function DeleteTestData(pk) {
            $http.delete('/api/v1/MyMeal/' + pk);
        }
    };
}]);