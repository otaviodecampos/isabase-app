(function () {
    'use strict'

    angular.module('isabase-app')
        .config(State);

    State.$inject = ['$stateProvider'];
    function State($stateProvider) {

        $stateProvider
            .state('admin', {
                url: "",
                abstract: true,
                templateUrl: "isabase-app/admin.tpl.html",
                controller: "AdminCtrl as admin",
                resolve: {
                    authentication: function (Auth, $log, $state, $location) {
                        return Auth.isAuthenticated().then(function (authenticated) {
                            return authenticated;
                        }, function () {
                            $state.go('login', {
                                redirectUrl: $location.path()
                            });
                        });
                    }
                }
            });

    };

})();