(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('FieldEditCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, $q, models, FIELD_TYPES, MODEL_FIELDS) {
        var that = this
            , appName = $stateParams.appName
            , modelCtrl = $scope.ctrl
            , field = modelCtrl.editingField;

        this.isNew = !field.name;
        this.fields = MODEL_FIELDS;
        this.field = angular.copy(field);
        this.types = FIELD_TYPES;
        this.models = models.query({appName: appName});

        $scope.$watch('fieldCtrl.field.target', function (newValue, oldValue) {
            that.modelFields = [];
            if (!newValue) {
                that.field.displayField = undefined;
            } else {
                initModelFields();
            }
        });

        $scope.$watch('fieldCtrl.field.type', function () {
            initModelFields();
        });

        $scope.$watchCollection('fieldCtrl.models', function () {
            initModelFields();
        });

        function initModelFields() {
            var modelLevel = {};

            if (that.field.type == 'model' && that.field.target) {
                var promise = getModelFields(that.field.target, '');
                that.modelFields.$promise = promise;
                promise.then(function (fields) {
                    that.modelFields = _.flattenDeep(fields);
                });
            }

            function getModelFields(modelName, prefix) {
                var deferred = $q.defer();

                models.get({appName: appName, modelName: modelName}).$promise.then(function (model) {
                    var promises = [];
                    angular.forEach(model.fields, function (field) {
                        promises.push(getFields(field, prefix));
                    });
                    $q.all(promises).then(function (fields) {
                        deferred.resolve(fields);
                    });
                });

                return deferred.promise;
            }

            function getFields(field, prefix) {
                var deferred = $q.defer();

                if (field.type == "model") {
                    var key = field.name + field.target;
                    if (modelLevel[key] == undefined) {
                        modelLevel[key] = 0;
                    }
                    modelLevel[key] = modelLevel[key] + 1;

                    prefix = prefix + field.name + '.';

                    if (modelLevel[key] < 2) {
                        getModelFields(field.target, prefix).then(function (fields) {
                            modelLevel[key] = modelLevel[key] - 1;
                            ;
                            deferred.resolve(fields);
                        });
                    } else {
                        deferred.resolve([]);
                    }
                } else {
                    deferred.resolve([prefix + field.name]);
                }

                return deferred.promise;
            }
        }

        this.save = function ($event) {

            var form = $scope.form;

            form.name.$validators.fieldSameNameMessage = function (modelValue, viewValue) {
                return !(modelValue && modelValue != field.name && _findField(modelValue));
            }

            form.name.$validate();

            if (form.$invalid) {
                $scope.form.$setSubmitted();
                $event.stopPropagation();
            } else {
                if (this.isNew) {
                    modelCtrl.model.fields.push(this.field);
                    modelCtrl.selected = this.field;
                } else {
                    angular.extend(_findField(field.name), this.field);
                }
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