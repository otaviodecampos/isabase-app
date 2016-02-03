(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppEditCtrl', Controller);

    /* @ngInject */
    function Controller(MyApp, $stateParams, Navigation) {
        var that = this;
        
        this.myapp = MyApp.get({id: $stateParams.id});
        
        this.save = function() {
            this.myapp.$save(function(app) {
                Navigation.back();
            }, function(e) {
                console.log(e);
            });
        }
        
        this.remove = function() {
            this.myapp.$remove(function() {
                Navigation.back();
            }, function(e) {
                console.log(e);
            });
        }
    }

})();