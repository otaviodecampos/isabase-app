(function () {
    'use strict'

    angular.module('isabase-app')
        .service('navigation', Service);

    /* @ngInject */
    function Service($state) {

        var that = this,
            currentParams = {};

        this.back = function(params) {
            $state.go('^', params);
        };

        this.setParams = function(params) {
            angular.extend(currentParams, params);
            return $state.go('.', params, {notify:false});
        }

        this.setParamsAndBack = function(params) {
            this.setParams(params).then(function() {
                that.back(params);
            });
        }

        this.go = function(stateName, params) {
            $state.go(stateName, params);
        }

        this.setCurrentParam = function(paramName, paramValue) {
            currentParams[paramName] = paramValue;
        }

        this.getCurrentParam = function(paramName) {
            return currentParams[paramName] || null;
        }
        
    };

})();