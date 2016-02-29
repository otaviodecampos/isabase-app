(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('AppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, App, Navigation, Notification, APP_FIELDS) {
        var that = this
            , appName = $stateParams.appName;

        this.fields = APP_FIELDS;
        this.myapp = App.get({appName: appName});
        this.myapp.$promise.then(null, Navigation.back);

        this.save = function () {
            this.myapp.$save({appName: appName == 'new' ? '' : appName}, function (app) {
                Notification.success('app', app.name, 'saveSuccess');
                Navigation.setParamsAndBack({appName: app.name});
            }, function (e) {
                Notification.error('app', that.myapp.name, 'saveFail');
                console.log(e);
            });
        }

        this.remove = function () {
            this.myapp.$remove(function () {
                Notification.success('app', that.myapp.name, 'removeSuccess');
                Navigation.back();
            }, function (e) {
                Notification.error('app', that.myapp.name, 'removeFail');
            });
        }

        this.clear = function () {
            angular.forEach(APP_FIELDS, function (field) {
                that.myapp[field.name] = null;
            });
        }

    }

})();