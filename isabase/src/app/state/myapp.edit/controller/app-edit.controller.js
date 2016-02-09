(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppEditCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, MyApp, Navigation, Notification) {
        var that = this;
        var title = 'edit-app';
        var id = $stateParams.id;

        this.myapp = MyApp.get({id: id});
        this.myapp.$promise.then(null, function() {
            Navigation.back();
        });

        this.save = function() {
            if(this.myapp.name) {
                this.myapp.$save(function(app) {
                    Navigation.back({selected: id});
                    Notification.success(title, that.myapp.name, 'save-success');
                }, function(e) {
                    console.log(e);
                    Notification.error(title, that.myapp.name, 'save-error');
                });
            } else {
                Notification.info(title, 'empty-app-name');
            }
        }
        
        this.remove = function() {
            this.myapp.$remove(function() {
                Navigation.back();
                Notification.success(title, that.myapp.name, 'remove-success');
            }, function(e) {
                Notification.error(title, that.myapp.name, 'remove-error');
            });
        }

    }

})();