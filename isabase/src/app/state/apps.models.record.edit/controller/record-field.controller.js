(function () {
    'use strict'

    angular.module('isabase-app')
        .controller('RecordFieldCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $stateParams, records, jsUtil) {
        var field = $scope.field
            , appName = $stateParams.appName;

        var watchRecord = $scope.$watch('ctrl.record', function(record) {
            
            if(record) {
                $scope.model = record;

                if (field.type == 'model') {
                    $scope.data = records.query({appName: appName, modelName: field.target});
        
                    $scope.data.$promise.then(function (data) {
                        angular.forEach(data, function (record) {
                            var displayValue = jsUtil.getObjectValue(record, field.displayField);
                            record.$displayField = {
                                value: displayValue
                            }
                        })
                    });
                }   
            }
            
            watchRecord();
            
        });

    }

})();