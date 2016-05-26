(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('ChangePasswordCtrl', Controller);

    /* @ngInject */
    function Controller($q, $http, notification, Auth, RESOURCE_URL) {

        var that = this;

        that.form = null;
        that.model = {};

        that.loader = $q.defer();
        that.loader.resolve();

        that.save = function() {
            that.loader = $http.post(RESOURCE_URL.changepassword, that.model);

            that.loader.success(function() {
                notification.success('changePasswordSuccess');
                Auth.authenticate(Auth.getUsername(), that.model.newPassword);
                that.model = {};
            });

            that.loader.error(function(error) {
                that.error = error;
                that.form.currentPassword.$setValidity("wrong", false);
            });
        }

    }

})();