(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, MyApp, Navigation, Notification) {
        var that = this;
        var id = $stateParams.id;

        this.myapp = MyApp.get({id: id});

        this.save = function() {
            if(this.myapp.name) {
                this.myapp.$save(function(app) {
                    Navigation.back({selected: id});
                    Notification.success('edit-app', that.myapp.name, 'save-success');
                }, function(e) {
                    Notification.error('edit-app', that.myapp.name, 'save-error');
                });
            } else {
                Notification.info('edit-app', that.myapp.name, 'empty-app-name');
            }
        }
        
        this.remove = function() {
            this.myapp.$remove(function() {
                Navigation.back();
                Notification.error('edit-app', that.myapp.name, 'remove-success');
            }, function(e) {
                Notification.error('edit-app', that.myapp.name, 'remove-error');
            });
        }

    }

})();