(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('AppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, App, Navigation, Notification, APP_FIELDS) {
        var that = this;
        var title = 'edit-app';
        var appName = $stateParams.appName;

        this.fields = APP_FIELDS;
        this.myapp = App.get({appName: appName});
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

        this.clear = function() {
            angular.forEach(APP_FIELDS, function(field) {
                that.myapp[field.name] = null;
            });
        }

    }

})();