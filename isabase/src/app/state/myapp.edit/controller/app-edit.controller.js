(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppEditCtrl', Controller);

    /* @ngInject */
    function Controller(MyApp, $stateParams, Navigation) {
        var that = this;
        var id = $stateParams.id;

        this.myapp = MyApp.get({id: id});

        this.save = function() {
            if(this.myapp.name != undefined) {
                this.myapp.$save(function(app) {
                    Navigation.back({selected: id});
                }, function(e) {
                    console.log(e);
                });
            }
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