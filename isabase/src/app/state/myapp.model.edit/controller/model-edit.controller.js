(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('ModelEditCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, MyApp, Model, Notification, Modal, Navigation) {
        var that = this
            , title = 'edit-model'
            , id = $stateParams.modelId
            , appId = $stateParams.appId;

        this.selected = null;
        this.myapp = MyApp.get({id: $stateParams.appId});
        this.myapp.$promise.then(null, function() {
            Navigation.back();
        });

        this.model = Model.get({appId: appId, id: id});
        this.model.$promise.then(function(model) {
            if(!model.fields) {
                model.fields = [];
            }
        }, function() {
            Navigation.back({selected: id});
        });

        this.save = function () {
            if (this.model.name) {
                this.model.appId = appId;
                this.model.$save(function (model) {
                    Navigation.back({selected: id});
                    Notification.success(title, that.model.name, 'save-success');
                }, function (e) {
                    Notification.error(title, that.model.name, 'save-error');
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