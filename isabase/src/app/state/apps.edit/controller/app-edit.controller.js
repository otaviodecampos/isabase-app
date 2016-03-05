(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('AppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, apps, navigation, notification, APP_FIELDS) {
        var that = this
            , appName = $stateParams.appName;

        this.fields = APP_FIELDS;
        this.myapp = apps.get({appName: appName});
        this.myapp.$promise.then(null, navigation.back);

        this.save = function () {
            this.myapp.$save({appName: appName == 'new' ? '' : appName}, function (app) {
                notification.success('app', app.name, 'saveSuccess');
                navigation.setParamsAndBack({appName: app.name});
            }, function (e) {
                notification.error('app', that.myapp.name, 'saveFail');
                console.log(e);
            });
        }

        this.remove = function () {
            this.myapp.$remove(function () {
                notification.success('app', that.myapp.name, 'removeSuccess');
                navigation.back();
            }, function (e) {
                notification.error('app', that.myapp.name, 'removeFail');
            });
        }

        this.clear = function () {
            angular.forEach(APP_FIELDS, function (field) {
                that.myapp[field.name] = null;
            });
        }

    }

})();