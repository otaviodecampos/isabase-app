(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppModelsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, Notification, MyApp, Model, Navigation) {
        var that = this
            , title = 'models';

        this.selected = null;
        this.myapp = MyApp.get($stateParams);
        this.myapp.$promise.then(null, function () {
            Navigation.back();
        });

        this.models = Model.query($stateParams);

        this.select = function (model) {
            this.selected = this.selected == model ? null : model;
        }

        this.removeSelected = function () {
            this.selected.$remove(function () {
                var index = that.models.indexOf(that.selected);
                that.models.splice(index, 1);
                Notification.success(title, that.selected.name, 'remove-success');
                that.selected = null;
            }, function (e) {
                Notification.error(title, that.selected.name, 'remove-error');
            });
        }

        this.init = function (model) {
            if($previousState.get() && model.name == $previousState.get().params.modelName) {
                that.selected = model;
            }
        }

    }

})();