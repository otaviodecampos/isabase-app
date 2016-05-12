(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelEditCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, apps, models, notification, modal, navigation, MODEL_FIELDS) {
        var that = this
            , appName = $stateParams.appName || navigation.getCurrentParam('appName')
            , modelName = $stateParams.modelName || navigation.getCurrentParam('modelName');

        this.selected = null;
        this.fields = MODEL_FIELDS;
        this.app = apps.get({appName: appName});
        this.app.$promise.then(null, navigation.back);

        this.model = models.get({appName: appName, modelName: modelName});
        this.model.$promise.then(function(model) {
            if(!model.fields) {
                model.fields = [];
            }
        }, navigation.back);

        this.save = function () {
            this.model.$save({appName: appName, modelName: modelName == 'new' ? '' : modelName}, function (model) {
                notification.success('model', that.model.name, 'saveSuccess');
                navigation.setParamsAndBack({modelName: model.name});
            }, function (e) {
                notification.error('model', that.model.name, 'saveFail');
                console.log(e);
            });
        }

        this.removeField = function () {
            var index = this.model.fields.indexOf(this.selected);
            this.model.fields.splice(index, 1);
            this.selected = null;
        }

        this.remove = function() {
            this.model.$remove({appName: appName, modelName: modelName}, function() {
                notification.success('model', that.model.name, 'removeSuccess');
                navigation.back();
            }, function(e) {
                notification.error('model', that.model.name, 'removeFail');
                console.log(e);
            });
        }

        this.select = function (field) {
            this.selected = this.selected == field ? null : field;
        }

        this.newField = function () {
            this.editField({
                type: 'text'
            });
        }

        this.editField = function (field) {
            this.editingField = field;
            modal.open({
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