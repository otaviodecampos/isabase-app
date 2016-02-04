(function() {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppModelsCtrl', Controller);

    /* @ngInject */
    function Controller(Model, $stateParams) {
        var that = this;

        this.selected = null;
        this.models = Model.query({appId: $stateParams.appId});

        this.select = function(model) {
            if(this.selected == model) {
                model = null;
            }
            this.selected = model;
        }

        this.removeSelected = function() {
            this.selected.$remove(function() {
                var index = that.models.indexOf(that.selected);
                that.models.splice(index, 1);
                that.selected = null;
            }, function(e) {
                console.log(e);
            });
        }

        this.init = function(model) {
            if(model.id == $stateParams.selected) {
                that.selected = model;
            }
        }

    }

})();