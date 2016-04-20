(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('AppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, apps, navigation, notification, APP_FIELDS) {
        var that = this
            , appName = $stateParams.appName || navigation.getCurrentParam('appName');

        this.fields = APP_FIELDS;
        this.app = apps.get($stateParams);
        this.app.$promise.then(null, navigation.back);

        this.save = function () {
            this.app.$save({appName: appName == 'new' ? '' : appName}, function (app) {
                notification.success('app', app.name, 'saveSuccess');
                navigation.setParamsAndBack({appName: app.name});
            }, function (e) {
                notification.error('app', that.app.name, 'saveFail');
                console.log(e);
            });
        }

        this.remove = function () {
            this.myapp.$remove(function () {
                notification.success('app', that.app.name, 'removeSuccess');
                navigation.back();
            }, function (e) {
                notification.error('app', that.app.name, 'removeFail');
                console.log(e);
            });
        }

        this.clear = function () {
            angular.forEach(APP_FIELDS, function (field) {
                that.app[field.name] = null;
            });
        }

    }

})();