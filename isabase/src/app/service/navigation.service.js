(function () {
    'use strict'

    angular.module('isabase-app')
        .service('Navigation', Service);

    /* @ngInject */
    function Service($state) {

        var that = this;

        this.back = function(params) {
            $state.go('^', params);
        };

        this.setParams = function(params) {
            return $state.go('.', params, {notify:false});
        }

        this.setParamsAndBack = function(params) {
            this.setParams(params).then(function() {
                that.back(params);
            });
        }
        
    };

})();