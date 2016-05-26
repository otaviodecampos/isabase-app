(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('LoginCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, Auth, navigation, $previousState) {

        var that = this;
        that.form = null;
        that.authPromise = null;

        if($previousState.get()) {
            Auth.invalidate();
        }

        that.setValidity = function (valid) {
            that.form.username.$setValidity("wrong", valid);
            that.form.password.$setValidity("wrong", valid);
        }

        that.login = function (username, password, $event) {
            that.authPromise = Auth.authenticate(username, password);

            that.authPromise.then(function () {
                if($stateParams.redirectUrl) {
                    navigation.goUrl($stateParams.redirectUrl);
                } else {
                    navigation.goDefaultState();
                }
            }, function () {
                that.setValidity(false);
            });

        }

    }

})();