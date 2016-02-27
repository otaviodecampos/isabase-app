(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, MyApp, Navigation, Notification) {
        var that = this;
        var title = 'edit-app';
        var appName = $stateParams.appName;

        this.myapp = MyApp.get({appName: appName});
        this.myapp.$promise.then(null, Navigation.back);

        this.save = function() {
            if(this.myapp.name) {
                this.myapp.$save({appName: appName == 'new' ? '' : appName}, function(app) {
                    Notification.success(title, app.name, 'save-success');
                    Navigation.setParamsAndBack({appName: app.name});
                }, function(e) {
                    Notification.error(title, that.myapp.name, 'save-error');
                    console.log(e);
                });
            } else {
                Notification.info(title, 'empty-app-name');
            }
        }
        
        this.remove = function() {
            this.myapp.$remove(function() {
                Notification.success(title, that.myapp.name, 'remove-success');
                Navigation.back();
            }, function(e) {
                Notification.error(title, that.myapp.name, 'remove-error');
            });
        }

    }

})();