(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('MyAppModelsCtrl', Controller);

    /* @ngInject */
    function Controller($stateParams, Notification, MyApp, Model, Navigation) {
        var that = this;
        var title = 'models';

        this.selected = null;
        this.myapp = MyApp.get({appName: $stateParams.appName});
        this.myapp.$promise.then(null, function () {
            Navigation.back();
        });

        this.models = Model.query({appName: $stateParams.appName});

        this.select = function (model) {
            if (this.selected == model) {
                model = null;
            }
            this.selected = model;
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
            if (model.name == $stateParams.selected) {
                that.selected = model;
            }
        }

    }

})();