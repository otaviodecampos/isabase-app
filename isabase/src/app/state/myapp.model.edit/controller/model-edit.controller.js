(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelEditCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, MyApp, Model, Notification, Modal, Navigation) {
        var that = this
            , title = 'edit-model'
            , modelName = $stateParams.modelName
            , appName = $stateParams.appName;

        this.selected = null;
        this.myapp = MyApp.get({appName: appName});
        this.myapp.$promise.then(null, function() {
            Navigation.back();
        });

        this.model = Model.get({appName: appName, modelName: modelName});
        this.model.$promise.then(function(model) {
            if(!model.fields) {
                model.fields = [];
            }
        }, function() {
            Navigation.back({selected: modelName});
        });

        this.save = function () {
            if (this.model.name) {
                this.model.appName = appName;
                this.model.$save({modelName: modelName == 'new' ? '' : modelName}, function (model) {
                    Navigation.back({selected: that.model.name});
                    Notification.success(title, that.model.name, 'save-success');
                }, function (e) {
                    Notification.error(title, that.model.name, 'save-error');
                    console.log(e);
                });
            } else {
                Notification.info(title, 'empty-app-name');
            }
        }

        this.remove = function () {
            var index = this.model.fields.indexOf(this.selected);
            this.model.fields.splice(index, 1);
            this.selected = null;
        }

        this.select = function (field) {
            if (this.selected == field) {
                field = null;
            }
            this.selected = field;
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
                templateUrl: 'isabase-app/field-edit.tpl.html',
                controller: 'FieldEditCtrl as fieldCtrl',
                scope: $scope
            });
        }
    }

})();