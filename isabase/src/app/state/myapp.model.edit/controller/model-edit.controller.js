(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelEditCtrl', Controller);

    /* @ngInject */
    function Controller(Model, $stateParams, Navigation) {
        var that = this;
        var id = $stateParams.id;
        var appId = $stateParams.appId;

        this.model = Model.get({appId: appId, id: id});

        this.save = function() {
            if(this.model.name != undefined) {
                this.model.appId = appId;
                this.model.$save(function (model) {
                    Navigation.back({selected: id});
                }, function (e) {
                    console.log(e);
                });
            }
        }
        
        this.remove = function() {
            this.model.$remove(function() {
                Navigation.back();
            }, function(e) {
                console.log(e);
            });
        }
    }

})();