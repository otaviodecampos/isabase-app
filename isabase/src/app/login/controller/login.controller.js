(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('LoginCtrl', Controller);

    /* @ngInject */
    function Controller($scope, Auth, navigation) {

        this.authPromise = null;

        this.login = function (username, password, $event) {
            this.authPromise = Auth.authenticate(username, password);

            this.authPromise.then(function () {
                navigation.go('admin.apps');
            }, function () {
                $scope.form.username.$setValidity("wrong", false);
                $scope.form.password.$setValidity("wrong", false);
            });

        }

    }

})();