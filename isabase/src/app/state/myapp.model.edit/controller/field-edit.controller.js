(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('FieldEditCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, Model, FIELD) {
        var that = this
            , modelCtrl = $scope.ctrl
            , field = modelCtrl.editingField;

        this.isNew = !field.name;
        this.field = angular.copy(field);
        this.types = FIELD;
        this.models = Model.query({appId: $stateParams.appId});

        this.save = function ($event) {
            this.message = null;

            try {
                if (!this.field.name) {
                    throw new Error('empty-field-name');
                }

                if (this.field.name != field.name && _findField(this.field.name)) {
                    throw new Error('same-field-name-error');
                }

                if(this.field.type == 'model' && !this.field.target) {
                    throw new Error('empty-field-target');
                }

                if (this.isNew) {
                    modelCtrl.model.fields.push(this.field);
                    modelCtrl.selected = this.field;
                } else {
                    angular.extend(_findField(field.name), this.field);
                }
            } catch (e) {
                this.message = e.message;
                $event.stopPropagation();
            }

        }

        function _findField(name) {
            var filtered = $.grep(modelCtrl.model.fields, function (field) {
                return field.name === name;
            });
            return filtered.length ? filtered[0] : null;
        }

    }

})();