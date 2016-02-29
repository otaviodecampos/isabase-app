(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelEditCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, App, Model, Notification, Modal, Navigation, MODEL_FIELDS) {
        var that = this
            , modelName = $stateParams.modelName
            , appName = $stateParams.appName;

        this.selected = null;
        this.fields = MODEL_FIELDS;
        this.myapp = App.get($stateParams);
        this.myapp.$promise.then(null, Navigation.back);

        this.model = Model.get($stateParams);
        this.model.$promise.then(function(model) {
            if(!model.fields) {
                model.fields = [];
            }
        }, Navigation.back);

        this.save = function () {
            this.model.appName = appName;
            this.model.$save({modelName: modelName == 'new' ? '' : modelName}, function (model) {
                Notification.success('model', that.model.name, 'saveSuccess');
                Navigation.setParamsAndBack({modelName: model.name});
            }, function (e) {
                Notification.error('model', that.model.name, 'saveFail');
                console.log(e);
            });
        }

        this.removeField = function () {
            var index = this.model.fields.indexOf(this.selected);
            this.model.fields.splice(index, 1);
            this.selected = null;
        }

        this.remove = function() {
            this.model.$remove(function() {
                Notification.success('model', that.model.name, 'removeSuccess');
                Navigation.back();
            }, function(e) {
                Notification.error('model', that.model.name, 'removeFail');
            });
        }

        this.select = function (field) {
            this.selected = this.selected == field ? null : field;
        }

        this.newField = function () {
            this.editField({
                type: 'text',
                fields: []
            });
        }

        this.editField = function (field) {
            this.editingField = field;
            Modal.open({
                templateUrl: 'isabase-app/field-edit.modal.tpl.html',
                controller: 'FieldEditCtrl as fieldCtrl',
                scope: $scope
            });
        }

        this.clear = function() {
            angular.forEach(MODEL_FIELDS.model, function(field) {
                that.model[field.name] = null;
            });
        }
    }

})();