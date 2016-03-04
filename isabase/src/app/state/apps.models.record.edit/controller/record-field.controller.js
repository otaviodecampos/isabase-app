(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordFieldCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, Records, JSUtil, $q) {
        var field = $scope.field
            , appName = $stateParams.appName;

        $scope.model = $scope.ctrl.record;

        if (field.type == 'model') {
            $scope.data = Records.query({appName: appName, modelName: field.target});

            $scope.data.$promise.then(function (data) {
                angular.forEach(data, function (record) {
                    var displayValue = JSUtil.getObjectValue(record, field.displayField);
                    record.$displayField = {
                        value: displayValue
                    }
                })
            });
        }

    }

})();