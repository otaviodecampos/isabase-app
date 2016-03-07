(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, $previousState, notification, apps, models, navigation) {
        var that = this
            , appName = $stateParams.appName;

        this.selected = null;
        this.myapp = apps.get($stateParams);
        this.myapp.$promise.then(null, navigation.back);

        this.models = models.query($stateParams);

        this.select = function (model) {
            this.selected = this.selected == model ? null : model;
        }

        this.removeSelected = function () {
            this.selected.$remove($stateParams, function () {
                var index = that.models.indexOf(that.selected);
                that.models.splice(index, 1);
                notification.success('model', that.selected.name, 'removeSuccess');
                that.selected = null;
            }, function (e) {
                notification.error('model', that.selected.name, 'removeError');
                console.log(e);
            });
        }

        this.init = function (model) {
            if($previousState.get() && model.name == $previousState.get().params.modelName) {
                that.selected = model;
            }
        }

    }

})();