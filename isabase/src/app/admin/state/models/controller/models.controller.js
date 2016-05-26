(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, apps, models, navigation) {
        var that = this
            , appName = $stateParams.appName || navigation.getCurrentParam('appName');

        that.selected = null;
        that.apps = apps.query();

        if(appName) {
            that.myapp = apps.get({appName: appName});
            that.models = models.query({appName: appName});
        }

        that.selectApp = function (app) {
            if(!that.myapp || that.myapp.name != app.name) {
                that.myapp = app;
                that.models = models.query({appName: app.name});
                appName = navigation.setCurrentParam('appName', app.name);
            }
        }

    }

})();