(function () {
    'use strict'

    angular.module('isabase-app')
        .service('navigation', Service);

    /* @ngInject */
    function Service($state, $location) {

        var that = this,
            currentParams = {};

        this.goDefaultState = function() {
            $location.path('/');
        }

        this.go = function(stateName, params) {
            $state.go(stateName, params);
        }

        this.goUrl = function(url) {
            $location.path(url);
        }

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

        this.setCurrentParam = function(paramName, paramValue) {
            currentParams[paramName] = paramValue;
            return paramValue;
        }

        this.getCurrentParam = function(paramName) {
            return currentParams[paramName] || null;
        }
        
    };

})();