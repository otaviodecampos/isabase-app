(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('ProfileCtrl', Controller);

    /* @ngInject */
    function Controller($q, $http, Auth, RESOURCE_URL) {

        var that = this;

        that.loader = $q.defer();
        that.loader.resolve();

        that.profile = {
            username: Auth.data.loginName,
            email: Auth.data.email
        };

        that.save = function() {
            that.loader = $http.post(RESOURCE_URL.profile, that.profile);
        }

    }

})();