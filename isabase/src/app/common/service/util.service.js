(function () {

    angular.module('common')
        .service('util', Service);

    /* @ngInject */
    function Service($timeout) {

        this.doubleTimeout = function(fn, delay) {

            if(delay == undefined) {
                delay = 100;
            }

            $timeout(function() {
                $timeout(function() {
                    fn();
                }, delay);
            }, delay);

        }

    }

})();